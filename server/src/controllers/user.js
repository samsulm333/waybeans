const { user } = require("../../models");

const joi = require("joi");

exports.getUserById = async (req, res) => {
  try {
    const id = req.params.id;

    const userData = await user.findOne({
      where: {
        id: id,
      },
      attributes: {
        exclude: ["password", "createdAt", "updatedAt"],
      },
    });

    res.status(200).send({
      status: "success",
      data: {
        user: {
          id: userData.id,
          email: userData.email,
          fullName: userData.fullName,
          role: userData.role,
          image: `http://localhost:5003/uploads/${userData.image}`,
        },
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

exports.updateUser = async (req, res) => {
  const schema = joi.object({
    fullName: joi.string().min(3).messages({
      "string.base": `fullname must be text`,
      "string.min": `fullname minimal 3 character`,
    }),
    email: joi
      .string()
      .email({
        tlds: {
          allow: ["com", "co", "net", "id"],
        },
      })
      .message("please insert valid email"),

    image: joi.string(),
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
      email: req.body.email,
      fullName: req.body.fullName,
      image: req.file.filename,
    };

    const updatedData = await user.update(data, {
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
