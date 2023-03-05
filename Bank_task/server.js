// importing express module
const express = require("express");
const app = express();

// importing express async handler
const expressAsyncHandler = require("express-async-handler");

// importing port number and assigning to app
require("dotenv").config();
const port = process.env.port;

app.listen(port, () => console.log(`Port initiated at ${port}`));

// importing sequelize from db
const sequelize = require("./databases/db.config");

// establishing databasee connection
sequelize
  .authenticate()
  .then(() => {
    console.log("Connection establishment success");
  })
  .catch((err) => {
    console.log("Error at db connection", err);
  });
sequelize.sync();

app.use(express.json());

// importing models
const { Bank } = require("./models/bank.model");

// importing routers
const bankApp = require("./routes/bank.routes");
app.use("/bank-api", bankApp);

// invalid path

app.use("*", (req, res) => {
  res.send({ message: "invalid path" });
});

//error handler
app.use((err, req, res, next) => {
  console.log(err);
  res.send({ message: err.message });
});
