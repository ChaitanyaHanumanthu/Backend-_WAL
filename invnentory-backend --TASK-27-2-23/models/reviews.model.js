const { DataTypes } = require("sequelize");
const sequelize = require("../databases/db.config");

exports.Reviews = sequelize.define(
  "reviews",
    {
    review_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    review_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    review_desc: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    freezeTableName: false,
    timestamps: false,
  }
);
