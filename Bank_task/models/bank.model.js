const { DataTypes } = require("sequelize");
const sequelize = require("../databases/db.config");
const { Sequelize } = require("../databases/db.config");

exports.Bank = sequelize.define(
  "bank",
  {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    account_number: {
      type: DataTypes.BIGINT,
      primaryKey: true,
    },
    balance: {
      type: DataTypes.BIGINT,
    },
  },
  {
    createdAt: false,
    updatedAt: false,
    timestamps: false,
    freezeTableName: true,
  }
);
