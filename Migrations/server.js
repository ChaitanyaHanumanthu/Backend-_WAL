// importing express

const exp = require("express");
const app = exp();

//importing port details and assigning a port
require("dotenv").config();

port = process.env.port;
app.listen(port, () => console.log(`Port initiated at ${port}`));

// importing sequelize from the databases
const sequelize = require("./databases/db.config");

// importing express async handler
const expressAsyncHandler = require("express-async-handler");
const { DataTypes } = require("sequelize");

//checking the database connection
sequelize
  .authenticate()
  .then(() => {
    console.log("Database connected");
  })
  .catch((err) => {
    console.log("error at db connection: ", err);
  });

// Importing models
const sampleModel = require("./models/sample");
const db = require("./models/index");

// model
const sample = sampleModel(db.sequelize, DataTypes);

app.use(exp.json());
//creatig routes to get the data
app.get(
  "/students",
  expressAsyncHandler(async (req, res) => {
    let data = await sample.findAll();
    res.send({ message: "the data: ", payload: data });
  })
);


app.post