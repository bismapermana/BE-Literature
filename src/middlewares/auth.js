const jwt = require("jsonwebtoken");
const { user } = require("../../models");

exports.auth = (req, res, next) => {
  try {
    const header = req.header("Authorization");

    if (!header) {
      return res.status(403).send({
        status: "failed",
        message: "forbidden access!",
      });
    }
    const token = header.replace("Bearer ", "");

    const secretKey = process.env.SECRET_KEY;

    const verified = jwt.verify(token, secretKey);
    req.idUser = verified;

    next();
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "error",
    });
  }
};

exports.admin = async (req, res, next) => {
  try {
    const { id } = req.idUser;
    const statusUser = await user.findOne({
      where: { id },
    });

    if (statusUser.status !== "admin") {
      return res.status(403).send({
        status: "failed",
        message: "forbiddedn access!",
      });
    }
    next();
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "error",
    });
  }
};
