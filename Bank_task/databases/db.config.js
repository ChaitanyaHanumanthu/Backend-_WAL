// importing sequelize
const { Sequelize } = require("sequelize");

// improting dotenv
require("dotenv").config();

const sequelize = new Sequelize(
  process.env.db_name,
  process.env.db_user,
  process.env.db_password,
  {
    host: "localhost",
    dialect: "mysql",
  }
);

module.exports = sequelize;
