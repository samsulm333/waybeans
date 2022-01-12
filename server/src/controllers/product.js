const { product, user } = require("../../models");
const joi = require("joi");

const Sequelize = require("sequelize");
const Op = Sequelize.Op;

exports.addProduct = async (req, res) => {
  const userId = req.user.id;
  const admin = await user.findOne({
    where: {
      id: userId,
    },
  });

  if (admin.role !== "admin") {
    return res.status(401).send({
      message: "Access Denied",
    });
  }

  try {
    const newProduct = {
      name: req.body.name,
      stock: parseInt(req.body.stock),
      price: parseInt(req.body.price),
      description: req.body.description,
      photo: req.file.filename,
    };

    const response = await product.create(newProduct);
    console.log(response);

    res.status(200).send({
      status: "success",
      data: {
        product: {
          id: response.id,
          name: response.name,
          price: response.price,
          description: response.description,
          stock: response.stock,
          photo: `http://localhost:5003/uploads/${response.photo}`,
        },
      },
    });
    console.log(newProduct);
  } catch (err) {
    console.log(err);
    res.status(500).send({
      status: "failed",
      message: "Server error",
    });
  }
};

// get all products
exports.getProducts = async (req, res) => {
  try {
    let data = await product.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
      order: [["id", "DESC"]],
    });

    data = data.map((item) => {
      return {
        id: item.id,
        name: item.name,
        price: item.price,
        description: item.description,
        stock: item.stock,
        photo: `http://localhost:5003/uploads/${item.photo}`,
      };
    });

    res.status(200).send({
      status: "success",
      data: {
        products: data,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      status: "failed",
      message: "Server error",
    });
  }
};

// get detail product
exports.getDetailproduct = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await product.findOne({
      where: {
        id: id,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    res.status(200).send({
      status: "success",
      data: {
        product: {
          id: data.id,
          name: data.name,
          price: data.price,
          description: data.description,
          stock: data.stock,
          photo: `http://localhost:5003/uploads/${data.photo}`,
        },
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      status: "failed",
      message: "Server error",
    });
  }
};

exports.updateProduct = async (req, res) => {
  const schema = joi.object({
    name: joi.string().min(3).messages({
      "string.base": `name must be text`,
      "string.min": `name minimal 3 character`,
    }),
    stock: joi.number().integer(),
    price: joi.number().integer(),
    description: joi.string(),
  });

  const { error } = schema.validate(req.body);

  if (error) {
    return res.status(400).send({
      message: error.details[0].message,
    });
  }
  try {
    const id = req.params.id;

    const data = {
      name: req.body.name,
      stock: parseInt(req.body.stock),
      price: parseInt(req.body.price),
      description: req.body.description,
      photo: req.file.filename,
    };

    const updatedData = await product.update(data, {
      where: {
        id,
      },
    });

    res.status(200).send({
      status: "success",
      message: `update user id ${id} succeed`,
      rowAffected: updatedData,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      status: "failed",
      message: "server error",
    });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const id = req.params.id;

    await product.destroy({
      where: {
        id: id,
      },
    });

    res.status(200).send({
      status: "success",
      message: "Delete product success",
      data: {
        id,
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

exports.searchProduct = async (req, res) => {
  try {
    const { q } = req.query;

    let data = await product.findAll({
      where: { name: { [Op.like]: `%${q}%` } },
    });

    if (data.length === 0) {
      res.status(400).send({
        status: "failed",
        message: "Prooduct not found",
      });
      return;
    } else {
      data = data.map((item) => {
        return {
          id: item.id,
          name: item.name,
          price: item.price,
          description: item.description,
          stock: item.stock,
          photo: `http://localhost:5003/uploads/${item.photo}`,
        };
      });

      res.status(200).send({
        status: "success",
        data: data,
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({
      status: "failed",
      message: "Server Error",
    });
  }
};
