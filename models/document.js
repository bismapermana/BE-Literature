"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class document extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      document.belongsTo(models.user, {
        as: "users",
        foreignKey: {
          name: "idUser",
        },
      });
      document.hasMany(models.collection, {
        as: "collections",
        foreignKey: {
          name: "idDocument",
        },
      });
    }
  }
  document.init(
    {
      title: DataTypes.STRING,
      idUser: DataTypes.INTEGER,
      publicationDate: DataTypes.DATE,
      page: DataTypes.INTEGER,
      ISBN: DataTypes.INTEGER,
      author: DataTypes.STRING,
      attachment: DataTypes.STRING,
      status: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "document",
    }
  );
  return document;
};
