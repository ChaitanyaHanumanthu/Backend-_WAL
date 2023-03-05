// express application

const app = require("express")();

// importing dotenv module
require("dotenv").config();

// assigning port numnber
port = process.env.port;
app.listen(port, () => console.log(`port initiated at ${port}`));

// importing sequelize from db
const sequelize = require("./databases/db.config");

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection to db success");
  })
  .catch((err) => {
    console.log("Error at db connection", err);
  });
sequelize.sync();

// importing routes
const youtubeApp = require("./routes/youtube.routes");
app.use("/youtube-api", youtubeApp);

//invalid path
app.use("*", (req, res, next) => {
  res.send({ message: "Invalid path" });
});

//error handler
app.use((err, req, res, next) => {
  res.send({ message: err.message });
});
