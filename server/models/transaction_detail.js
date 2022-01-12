"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class transaction_detail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      transaction_detail.belongsTo(models.transaction, {
        as: "transaction",
        foreignKey: {
          name: "transaction_id",
        },
      });
      transaction_detail.belongsTo(models.product, {
        as: "products",
        foreignKey: {
          name: "product_id",
        },
      });
    }
  }
  transaction_detail.init(
    {
      transaction_id: DataTypes.INTEGER,
      product_id: DataTypes.INTEGER,
      qty: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "transaction_detail",
    }
  );
  return transaction_detail;
};
