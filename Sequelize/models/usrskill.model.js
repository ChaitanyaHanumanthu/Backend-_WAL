const { DataTypes } = require("sequelize");
const sequelize = require("../db/db.config");

exports.Usrskill = sequelize.define(
  "usrskill",
  {
    skill_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    skill_name: {
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
