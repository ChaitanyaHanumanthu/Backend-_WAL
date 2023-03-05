// importing sequelize module
const { Sequelize } = require("sequelize");

require("dotenv").config();

//creating new instance
const sequelize = new Sequelize(
  process.env.db_name,
  process.env.db_user,
  process.env.db_password,
  {
    host: "localhost",
    dialect: "mysql",
  }
);

// exporting sequelize
module.exports = sequelize;
