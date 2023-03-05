const { DataTypes } = require("sequelize");
const sequelize = require("../db/db.config");

exports.Employee = sequelize.define(
  "employee",
  {
    emp_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    emp_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    createdAt: false,
    updatedAt: false,
    freezeTableName: true,
    timestamps: false,
  }
);

// (async () => await this.Employee.sync())();
