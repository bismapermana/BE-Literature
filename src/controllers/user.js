const { user } = require("../../models/");

exports.getUsers = async (req, res) => {
  try {
    const users = await user.findAll();
    res.status(200).send({
      status: "success",
      users,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
    });
  }
};

exports.getUsersId = async (req, res) => {
  try {
    const { id } = req.idUser;
    const users = await user.findOne({
      where: { id },
    });

    res.status(200).send({
      status: "success",
      users,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
    });
  }
};
exports.editUser = async (req, res) => {
  try {
    const { id } = req.idUser;
    const picture = req.files.picture[0].filename;
    const profilePicture = process.env.PATH_PICTURE + picture;

    const allData = {
      ...req.body,
      profilePicture: profilePicture,
    };

    const users = await user.update(allData, { where: { id } });

    res.status(200).send({
      status: "success",
      users,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
    });
  }
};
