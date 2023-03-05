const { DataTypes } = require("sequelize");
const sequelize = require("../databases/db.config");

exports.Customer = sequelize.define(
  "customer",
  {
    customer_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    customer_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    customer_email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    createdAt: false,
    updatedAt: false,
    freezeTableName: false,
    timestamps: false,
  }
);
