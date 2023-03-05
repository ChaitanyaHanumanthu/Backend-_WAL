  const { DataTypes } = require("sequelize");
const sequelize = require("../databases/db.config");

exports.Channel = sequelize.define(
  "channel",
  {
    channel_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    channel_name: {
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
