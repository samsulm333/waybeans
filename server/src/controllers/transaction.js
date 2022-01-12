const {
  product,
  user,
  transaction,
  transaction_detail,
} = require("../../models");

// add transaction
exports.addTransaction = async (req, res) => {
  try {
    let orders = JSON.parse(req.body.products);
    //get user id from token
    const buyyerId = req.user.id;

    // insert into order table
    let orderCreated = await transaction.create({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      post_code: req.body.post_code,
      address: req.body.address,
      attachment: req.file.filename,
      subtotal: req.body.subtotal,
      buyyer_id: buyyerId,
    });

    // insert into order_detail table
    const orderItems = orders.map((item) => {
      return {
        transaction_id: orderCreated.id,
        product_id: item.id,
        qty: item.qty,
      };
    });

    orders = await transaction_detail.bulkCreate(orderItems);

    // get data userOrder
    const response = await transaction.findOne({
      include: {
        model: user,
        as: "buyyer",
        attributes: {
          exclude: ["createdAt", "updatedAt", "password", "role", "image"],
        },
      },
      where: {
        buyyer_id: orderCreated.buyyer_id,
      },
    });

    // get order item
    let responseOrder = await transaction_detail.findAll({
      where: {
        transaction_id: orderCreated.id,
      },
      include: {
        model: product,
        as: "products",
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      },
      attributes: {
        exclude: [
          "createdAt",
          "updatedAt",
          "id",
          "transaction_id",
          "product_id",
        ],
      },
    });

    const updateQty = responseOrder.map(async (item) => {
      const data = {
        stock: item.products.stock - item.qty,
      };

      await product.update(data, {
        where: {
          id: item.products.id,
        },
      });
    });

    console.log(updateQty);

    responseOrder = JSON.parse(JSON.stringify(responseOrder));

    responseOrder = responseOrder.map((item) => {
      return {
        id: item.products.id,
        name: item.products.name,
        price: item.products.price,
        description: item.products.description,
        stock: item.products.stock,
        photo: `http://localhost:5003/uploads/${item.products.photo}`,
        orderQuantity: item.qty,
      };
    });

    res.status(200).send({
      status: "success",
      data: {
        transaction: {
          id: orderCreated.id,
          user: {
            id: response.buyyer.id,
            fullname: response.buyyer.fullname,
            email: response.buyyer.email,
          },
          name: orderCreated.name,
          email: orderCreated.email,
          phone: orderCreated.phone,
          address: orderCreated.address,
          attachment: orderCreated.attachment,
          status: orderCreated.status,
          products: responseOrder,
        },
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      status: "failed",
      message: "Server Error",
    });
  }
};

// get transaction by Admin
exports.getAllTransactionByAdmin = async (req, res) => {
  const id = req.user.id;

  console.log(id);

  const userLogin = await user.findOne({
    where: {
      id: id,
    },
  });

  console.log(userLogin);

  try {
    const data = await transaction.findAll({
      include: [
        {
          model: user,
          as: "buyyer",
          attributes: {
            exclude: ["password", "createdAt", "updatedAt", "role", "image"],
          },
        },
        {
          model: transaction_detail,
          as: "products",
          include: {
            model: product,
            as: "products",
          },
        },
      ],
    });

    const transactions = data.map((order) => {
      let products = order.products;
      const orderitem = products.map((item) => {
        return {
          id: item.products.id,
          name: item.products.name,
          price: item.products.price,
          description: item.products.description,
          photo: `http://localhost:5003/uploads/${item.products.photo}`,
          qty: item.qty,
        };
      });

      return {
        id: order.id,
        user: {
          id: order.buyyer.id,
          fullName: order.buyyer.fullName,
          email: order.buyyer.email,
        },
        name: order.name,
        email: order.email,
        phone: order.phone,
        address: order.address,
        post_code: order.post_code,
        attachment: order.attachment,
        status: order.status,
        subtotal: order.subtotal,
        products: orderitem,
      };
    });

    res.status(200).send({
      status: "success",
      data: {
        transaction: transactions,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
      message: "Server Error",
    });
  }
};

exports.getUserTransaction = async (req, res) => {
  const id = req.user.id;

  try {
    let data = await transaction.findAll({
      where: {
        buyyer_id: id,
      },
      include: [
        {
          model: user,
          as: "buyyer",
          attributes: {
            exclude: ["password", "createdAt", "updatedAt", "role", "image"],
          },
        },
        {
          model: transaction_detail,
          as: "products",
          include: {
            model: product,
            as: "products",
          },
        },
      ],
      order: [["id", "DESC"]],
    });

    const transactions = data.map((order) => {
      const orderitem = order.products.map((item) => {
        return {
          id: item.products.id,
          name: item.products.name,
          price: item.products.price,
          description: item.products.description,

          photo: `http://localhost:5003/uploads/${item.products.photo}`,
          qty: item.qty,
        };
      });

      const dateTimeFormat = new Intl.DateTimeFormat("en-GB", {
        weekday: "long",
        year: "numeric",
        month: "short",
        day: "numeric",
      });

      const transactionDate = dateTimeFormat.format(order.createdAt);

      return {
        id: order.id,
        name: order.name,
        email: order.email,
        phone: order.phone,
        address: order.address,
        attachment: order.attachment,
        status: order.status,
        subtotal: order.subtotal,
        transaction_date: transactionDate,
        products: orderitem,
      };
    });

    // console.log(req.user.email);

    res.status(200).send({
      status: "success",
      data: {
        user: data[0].buyyer,
        transactions: transactions,
        // transaction: data,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
      message: "Server Error",
    });
  }
};

// Edit Transactions
exports.editTransaction = async (req, res) => {
  try {
    const transactionId = req.params.id;

    const data = {
      status: req.body.status,
    };

    // console.log(req.body);

    await transaction.update(data, {
      where: {
        id: transactionId,
      },
    });

    let responseData = await transaction.findOne({
      where: {
        id: transactionId,
      },
      include: [
        {
          model: user,
          as: "buyyer",
          attributes: {
            exclude: ["password", "createdAt", "updatedAt", "role", "image"],
          },
        },
        {
          model: transaction_detail,
          as: "products",
          include: {
            model: product,
            as: "products",
          },
        },
      ],
    });

    const orderitem = responseData.products.map((item) => {
      return {
        id: item.products.id,
        name: item.products.name,
        price: item.products.price,
        description: item.products.description,
        photo: `http://localhost:5003/uploads/${item.products.image}`,
        orderQuantity: item.qty,
      };
    });

    const transactions = {
      id: responseData.id,
      userOrder: responseData.buyyer,
      name: responseData.name,
      email: responseData.email,
      phone: responseData.phone,
      address: responseData.address,
      attachment: responseData.attachment,
      status: responseData.status,
      products: orderitem,
    };

    res.status(200).send({
      status: "success",
      data: {
        transaction: transactions,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      status: "failed",
      message: "server error",
    });
  }
};
