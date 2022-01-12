const { user } = require("../../models");
const joi = require("joi");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  const schema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(6).required(),
    fullName: joi.string().min(3).required().messages({
      "string.base": `Name must be text`,
      "string.empty": `Fullname field cannot be empty`,
      "string.min": `"Fullname" should have a minimum length of `,
      "any.required": `"Fullname" is required`,
    }),
  });
  const { error } = schema.validate(req.body);

  if (error) {
    return res.status(400).send({
      status: "failed",
      message: error.details[0].message,
    });
  }
  const image = "male-avatar.png";

  const userExist = await user.findOne({
    where: {
      email: req.body.email,
    },
  });

  if (userExist) {
    return res.status(400).send({
      status: "failed",
      message: "email is already registered, Please Login!",
    });
  }

  try {
    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const data = {
      email: req.body.email,
      password: hashedPassword,
      fullName: req.body.fullName,
      image: image,
    };

    const newUser = await user.create(data);

    const token = jwt.sign(
      {
        id: newUser.id,
        fullName: newUser.fullName,
        email: newUser.email,
      },
      process.env.TOKEN_KEY
    );

    res.status(200).send({
      status: "success",
      message: "Register success, Please login !",
      data: {
        user: {
          email: newUser.email,
          token: token,
        },
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
      message: "server error",
    });
  }
};

exports.login = async (req, res) => {
  const schema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(6).required(),
  });

  const { error } = schema.validate(req.body);

  if (error) {
    return res.status(400).send({
      message: error.details[0].message,
    });
  }
  try {
    const { email, password } = req.body;

    const userExist = await user.findOne({
      where: {
        email: email,
      },
    });

    console.log(userExist);

    if (userExist === null) {
      return res.status(400).send({
        status: "failed",
        message: "Email or Password not match",
      });
    }

    const isValid = await bcrypt.compare(password, userExist.password);

    if (!isValid) {
      return res.status(400).send({
        status: "failed",
        message: "Email & Password not match",
      });
    }

    const data = {
      id: userExist.id,
      fullname: userExist.fullname,
      email: userExist.email,
      role: userExist.role,
    };

    const token = jwt.sign(data, process.env.TOKEN_KEY);

    res.status(200).send({
      status: "success",
      data: {
        user: {
          id: userExist.id,
          email: userExist.email,
          role: userExist.role,
          image: `http://localhost:5003/uploads/${userExist.image}`,
          token,
        },
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
      message: "server error",
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
