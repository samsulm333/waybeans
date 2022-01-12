const jwt = require("jsonwebtoken");

exports.auth = async (req, res, next) => {
  const authHeader = req.header("Authorization");

  const token = authHeader && authHeader.split(" ")[1];

  try {
    if (!token) {
      return res.status(401).send({
        message: "Access Denied",
      });
    } else {
      const verified = jwt.verify(token, process.env.TOKEN_KEY);

      req.user = verified;

      next();
    }
  } catch (err) {
    res.status(400).send({
      message: "Invalid Token",
    });
  }
};

exports.checkAuth = async (req, res) => {
  try {
    const id = req.user.id;

    const dataUser = await user.findOne({
      where: {
        id,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt", "password"],
      },
    });

    if (!dataUser) {
      return res.status(404).send({
        status: "failed",
      });
    }

    res.send({
      status: "success...",
      data: {
        user: {
          id: dataUser.id,
          fullname: dataUser.fullname,
          email: dataUser.email,
          image: `http://localhost:5003/uploads/${dataUser.image}`,
          role: dataUser.role,
        },
      },
    });
  } catch (error) {
    console.log(error);
    res.status({
      status: "failed",
      message: "Server Error",
    });
  }
};
