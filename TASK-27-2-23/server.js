// importing express modules
const express = require("express");
const app = express();

//importing express async handler
const expressAsyncHandler = require("express-async-handler");

//importing dotenv
require("dotenv").config();

//assigning port number
port = process.env.port;
app.listen(port, () => {
  console.log(`Port initiated at ${port}`);
});

//body parser
app.use(express.json());

//customer api - router
const customerApp = require("./routes/customer.route");
//product -api router
const productApp = require("./routes/product.router");
app.use("/customer-api", customerApp);
app.use("/product-api", productApp);

// importing sequelize from database
const sequelize = require("./databases/db.config");

//establishing database connection
sequelize
  .authenticate()
  .then(() => {
    console.log("Connection established succesfully");
  })
  .catch((err) => {
    console.log(err);
  });
sequelize.sync();

//invalid path

app.use("*", (req, res, next) => {
  res.send({ message: "Invalid path" });
});

//error handler
app.use((err, req, res, next) => {
  res.send({ message: err.message });
});
