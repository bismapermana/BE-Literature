"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class collection extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      collection.belongsTo(models.user, {
        as: "users",
        foreignKey: {
          name: "idUser",
        },
      });
      collection.belongsTo(models.document, {
        as: "documents",
        foreignKey: {
          name: "idDocument",
        },
      });
    }
  }
  collection.init(
    {
      idUser: DataTypes.INTEGER,
      idDocument: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "collection",
    }
  );
  return collection;
};
