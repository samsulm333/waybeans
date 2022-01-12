"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      transaction.belongsTo(models.user, {
        as: "buyyer",
        foreignKey: {
          name: "buyyer_id",
        },
      });
      transaction.hasMany(models.transaction_detail, {
        as: "products",
        foreignKey: {
          name: "transaction_id",
        },
      });
    }
  }
  transaction.init(
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      phone: DataTypes.STRING,
      post_code: DataTypes.INTEGER,
      address: DataTypes.STRING,
      attachment: DataTypes.STRING,
      subtotal: DataTypes.INTEGER,
      buyyer_id: DataTypes.INTEGER,
      status: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "transaction",
    }
  );
  return transaction;
};
