// importing express moduke
const express = require("express");
const sequelize = require("./databases/db.config");
const app = express();

//importing env files
require("dotenv").config();

// Assigning the port number
port = process.env.port;
app.listen(port, () =>
  console.log(`Port initiated at the port number ${port}`)
);

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

// Importing student app
const StudentApp = require("./routes/students.route");
app.use("/student-api", StudentApp);

//invalid path

app.use("*", (req, res, next) => {
  res.send({ message: "Invalid path" });
});

//error handler
app.use((err, req, res, next) => {
  res.send({ message: err.message });
});
