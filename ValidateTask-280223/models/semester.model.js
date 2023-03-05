const { DataTypes } = require("sequelize");
const sequelize = require("../databases/db.config");
const { Student } = require("./students.model");

exports.Semester = sequelize.define(
  "semester",
  {
    semester: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      
    },
    roll_no: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: Student,
        key: "roll_no",
      },
    },
    maths: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    physics: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    chemistry: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);
