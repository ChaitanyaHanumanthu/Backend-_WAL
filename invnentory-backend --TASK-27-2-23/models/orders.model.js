const { DataTypes } = require("sequelize");
const sequelize = require("../databases/db.config");

exports.Orders = sequelize.define(
  "orders",
  {
    order_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    order_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);
