const sequelize = require("../db/db.config");

const { DataTypes } = require("sequelize");

// 1.Create “User”  model with properties firstName,lastName,email,password,age & gender
// save all string data in  lowercase
// validate email
// age shd be between 20 and 25
// length of firstName shd be greater than 4 chars
// While reading users data , add “Mr ” to males and “Ms.” to females

exports.User = sequelize.define(
  "users",
  {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      get() {
        let getGender = this.getDataValue("gender");
        if (getGender == "male") {
          return "Mr " + firstName;
        } else {
          return "Ms " + firstName;
        }
      },
      set(firstName) {
        this.setDataValue("firstName", firstName.toLowerCase());
      },
      validate: {
        checkLength(fname) {
          if (fname.length < 4) {
            throw new Error("firs name should be greater than 4 chars");
          }
        },
      },
    },

    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      set(lastName) {
        this.setDataValue("lastName", lastName.toLowerCase());
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: {
          msg: "Enter validate email",
        },
      },
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: {
          msg: "age should be greater than 20",
          args: 20,
        },
        max: {
          msg: "age should be less than 25",
          args: 25,
        },
      },
    },
    gender: {
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

(async () => await this.User.sync())();
