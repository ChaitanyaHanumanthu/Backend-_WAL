const { DataTypes } = require("sequelize");
const sequelize = require("../databases/db.config");

exports.Owner = sequelize.define(
  "owner",
  {
    owner_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    owner_name: {
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
