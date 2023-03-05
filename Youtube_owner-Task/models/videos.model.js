const { DataTypes } = require("sequelize");
const sequelize = require("../databases/db.config");

exports.Video = sequelize.define(
  "videos",
  {
    video_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    video_title: {
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
