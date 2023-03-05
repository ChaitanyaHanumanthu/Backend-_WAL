const { DataTypes } = require("sequelize");
const sequelize = require("../db/db.config");

exports.Usr = sequelize.define(
  "usr",
  {
    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    user_name: {
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


