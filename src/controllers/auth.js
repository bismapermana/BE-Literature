const { user } = require("../../models/");
const joi = require("joi");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {
    const data = req.body;

    const schema = joi
      .object({
        fullName: joi.string().required(),
        email: joi
          .string()
          .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } }),
        password: joi.string().min(5).required(),
        phone: joi.number().required(),
        gender: joi.string(),
        address: joi.string(),
      })
      .validate(data);

    if (schema.error) {
      return res.status(400).send({
        status: "failed",
        message: schema.error.message,
      });
    }

    const findData = await user.findOne({
      where: { email: req.body.email },
    });

    if (findData) {
      return res.status(400).send({
        status: " error",
        message: "email has been registered",
        data: findData,
      });
    }

    const { password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const createData = await user.create({
      ...data,
      password: hashedPassword,
    });

    res.status(200).send({
      status: "success",
      createData,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const schema = joi
      .object({
        email: joi
          .string()
          .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } }),
        password: joi.string().min(5).required(),
      })
      .validate(req.body);

    if (schema.error) {
      return res.status(400).send({
        status: "error",
        message: schema.error.message,
      });
    }

    const checkEmail = await user.findOne({
      where: { email },
    });

    const isValidPassword = await bcrypt.compare(password, checkEmail.password);

    if (!checkEmail || !isValidPassword) {
      return res.status(400).send({
        status: "failed",
        message: "email or password do not match",
      });
    }

    const token = jwt.sign(
      {
        id: checkEmail.id,
      },
      process.env.SECRET_KEY
    );

    res.status(200).send({
      status: "success",
      message: "successfully login",
      users: {
        email: checkEmail.email,
        status: checkEmail.status,
        token,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
    });
  }
};
