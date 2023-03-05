//importing sequellize
const sequelize = require("../db/db.config");

// importing datatypes from sequelize
const { DataTypes } = require("sequelize");

//importing bcrypt
const bcrypt = require("bcryptjs");
// defining a model

exports.Customer = sequelize.define(
  "customer",
  {
    customerId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },

    customerName: {
      type: DataTypes.STRING,
      allowNull: false,
      get() {
        let name = this.getDataValue("customerName");
        return "Mr " + name;
      },
      set(customerName) {
        this.setDataValue("customerName", customerName.toUpperCase());
      },
      validate: {
        checkLen(pwd) {
          if (pwd.length < 6) {
            throw new Error("Password should be in range of 6 and 10 chars");
          }
        },
      },
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false,
      set(password) {
        let hashed = bcrypt.hashSync("password", 5);
        this.setDataValue("password", hashed);
      },
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: {
          msg: "Enter valid email",
        },
      },
    },

    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
      get() {
        let age = this.getDataValue("age");
        return age + " Years";
      },
      validate: {
        isNumeric: {
          msg: "Age should be numeric values",
        },
      },
    },
  },
  {
    timestamps: false,
    updatedAt: false,
    createdAt: false,
    // tableName : "Chaitanya"
    freezeTableName: true,
  }
);

//iife - immediately invoked function expression helps to create table without even calling (once model is defined)
(async () => {
  await this.Customer.sync();
})();
