const { DataTypes } = require("sequelize");
const sequelize = require("../db/db.config");

exports.Usrcontact = sequelize.define(
  "contact",
  {
    mobile: {
      type: DataTypes.BIGINT,
      primaryKey: true,
    },
    landline: {
      type: DataTypes.BIGINT,
    },
  },
  {
    createdAt: false,
    timestamps: false,
    updatedAt: false,
    freezeTableName: true,
  }
);
