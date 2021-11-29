const { document, collection, user } = require("../../models");

exports.addCollection = async (req, res) => {
  try {
    const { id } = req.idUser;

    const collections = await collection.create({
      idDocument: req.body.idDocument,
      idUser: id,
    });

    res.status(200).send({
      status: "success",
      collections,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
      message: "failed to add collection",
    });
  }
};

exports.getCollections = async (req, res) => {
  try {
    const { id } = req.idUser;

    const collections = await collection.findAll({
      where: { idUser: id },
      include: {
        model: document,
        as: "documents",
        attributes: {
          exclude: ["createdAt", "updatedAt", "idUser"],
        },
        include: {
          model: user,
          as: "users",
          attributes: {
            exclude: [
              "updatedAt",
              "createdAt",
              "password",
              "gender",
              "address",
              "phone",
              "email",
              "profilePicture",
              "status",
            ],
          },
        },
      },
      attributes: {
        exclude: ["updatedAt", "createdAt", "idUser", "idDocument", "id"],
      },
    });

    res.status(200).send({
      status: "success",
      collections,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
      message: "failed to get Collection",
    });
  }
};

exports.getAllDocument = async (req, res) => {
  try {
    const documents = await collection.findAll({
      include: [
        {
          model: user,
          as: "users",
          attributes: {
            exclude: [
              "id",
              "password",
              "email",
              "gender",
              "address",
              "profilePicture",
              "updatedAt",
              "createdAt",
            ],
          },
        },
        {
          model: document,
          as: "documents",
          attributes: {
            exclude: ["idUser", "id", "updatedAt", "createdAt"],
          },
        },
      ],
      exclude: ["idUser", "idDocument"],
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

exports.getDocumentById = async (req, res) => {
  try {
    const { id } = req.idUser;
    const documents = await collection.findOne({
      where: { id },
      include: [
        {
          model: user,
          as: "users",
          attributes: {
            exclude: [
              "id",
              "password",
              "email",
              "gender",
              "address",
              "profilePicture",
              "updatedAt",
              "createdAt",
            ],
          },
        },
        {
          model: document,
          as: "documents",
          attributes: {
            exclude: ["idUser", "id", "updatedAt", "createdAt"],
          },
        },
      ],
      exclude: ["idUser", "idDocument"],
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
