const { DataTypes } = require("sequelize");
const sequelize = require("../db/db.config");

exports.Cust = sequelize.define(
  "cust",
  {
    cust_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    cust_name: {
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


