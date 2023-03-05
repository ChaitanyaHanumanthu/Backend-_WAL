const { DataTypes } = require("sequelize");
const sequelize = require("../db/db.config");

exports.Usradrs = sequelize.define(
  "usradrs",
  {
    street: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    createdAt: false,
    updatedAt: false,
    timestamps: false,
    freezeTableName: true,
  }
);
