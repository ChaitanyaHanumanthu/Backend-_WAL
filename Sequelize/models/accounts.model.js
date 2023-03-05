const { DataTypes } = require("sequelize");
const sequelize = require("../db/db.config");

exports.Accounts = sequelize.define(
  "account",
  {
    bank_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    account_number: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
  },
  {
    createdAt: false,
    updatedAt: false,
    timestamps: false,
    freezeTableName: true,
  }
);
