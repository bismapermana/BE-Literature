const { document, user } = require("../../models");

exports.getdocuments = async (req, res) => {
  try {
    const documents = await document.findAll({
      include: {
        model: user,
        as: "users",
        attributes: {
          exclude: [
            "updatedAt",
            "createdAt",
            "id",
            "status",
            "profilePicture",
            "password",
            "gender",
            "phone",
            "address",
          ],
        },
      },
      attributes: {
        exclude: ["idUser", "updatedAt", "createdAt"],
      },
    });

    res.status(200).send({
      status: "success",
      documents,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
    });
  }
};

exports.getdocumentbyId = async (req, res) => {
  try {
    const { id } = req.params;
    const documents = await document.findOne({
      where: { id },
      include: {
        model: user,
        as: "users",
        attributes: {
          exclude: [
            "updatedAt",
            "createdAt",
            "id",
            "status",
            "profilePicture",
            "gender",
            "phone",
            "password",
          ],
        },
      },
      attributes: {
        exclude: ["idUser", "updatedAt", "createdAt"],
      },
    });

    res.status(200).send({
      status: "success",
      documents,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
      message: "failed to get document",
    });
  }
};

exports.getdocumentbyToken = async (req, res) => {
  try {
    const { id } = req.idUser;
    const documents = await document.findAll({
      where: { idUser: id },
      include: {
        model: user,
        as: "users",
        attributes: {
          exclude: [
            "updatedAt",
            "createdAt",
            "id",
            "status",
            "profilePicture",
            "gender",
            "phone",
            "password",
          ],
        },
      },
      attributes: {
        exclude: ["idUser", "updatedAt", "createdAt"],
      },
    });

    res.status(200).send({
      status: "success",
      documents,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
    });
  }
};

exports.addDocument = async (req, res) => {
  try {
    const { id } = req.idUser;
    const doc = process.env.PATH_DOC + req.files.doc[0].filename;
    const allData = {
      ...req.body,
      attachment: doc,
      idUser: id,
      status: "waiting to be verified",
    };

    const documents = await document.create(allData);

    res.status(200).send({
      status: "success",
      documents,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
    });
  }
};

exports.verifieddocuments = async (req, res) => {
  try {
    const { id } = req.params;

    await document.update(req.body, { where: { id } });

    res.status(200).send({
      status: "success",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      staus: "failed",
    });
  }
};
