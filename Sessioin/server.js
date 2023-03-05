const connection = require("./db.config");
const exp = require("express");
const app = exp();
require("dotenv").config();
const port = process.env.port;

const bcryptjs = require("bcryptjs");

// connection

app.listen(1010, () => {
  console.log("Port initiated");
});

connection.connect((err) => {
  if (!err) {
    console.log("Db Connected");
  } else {
    console.log("error");
  }
});

// importing
const session = require("express-session");
const MySqlStore = require("express-mysql-session")(session);

// create session store
const sessionStore = new MySqlStore({}, connection.promise());

// configure express session
app.use(
  session({
    secret: "secret key",
    saveUninitialized: true,
    resave: false,
    store: sessionStore,
    cookie: {
      maxAge: 10000,
    },
  })
);


// 9490323219 passcode

app.use(exp.json());

let sample = () => {
  // getting users
  app.get("/users", (req, res) => {
    res.send({ message: "Success" });
  });

  // logging in
  app.post("/login", (req, res) => {
    let { username, password } = req.body;
    if (username == "Chaitu" && password == "Chaitu") {
      req.session.username = username;
      res.send({
        message: "user logged in",
        message: `welcome back mr ${username}`,
      });
    } else {
      res.send({ message: "invalid user" });
    }
  });

  // logging out
  app.get("/logout", (req, res) => {
    req.session.destroy(() => {
      res.send({ message: "Logged out " });
    });
  });

  // modifying user
  app.put("/modify-user", (req, res) => {
    let { username, password, newUsername } = req.body;
    if (username == "Chaitu" && password == "Chaitu") {
      req.session.username = newUsername;
      res.send({
        message: `user modified and useername set to ${newUsername}`,
      });
    } else {
      res.send({ message: "invalid user" });
    }
  });
};


const db = connection.promise();

// getting al users

app.get("/getUsers", async (req, res) => {
  let [users] = await db.query("select * from users");
  res.send({ message: "Users data: ", payload: users });
});

//creating user

app.post("/createUser", async (req, res) => {
  let { username, password } = req.body;
  let [checkUser] = await db.query(
    "select * from users where username=?",
    username
  );
  if (checkUser[0] == undefined) {
    let hashedPassword = await bcryptjs.hash(password, 5);
    password = hashedPassword;
    await db.query("insert into users set username=?, password=?", [
      username,
      password,
    ]);
    req.session.username = username;
    res.send({ message: "user added" });
  } else {
    res.send({ message: "user already exists" });
  }
});

//loggin user
app.post("/login-user", async (req, res) => {
  let { username, password } = req.body;
  let [userChecking] = await db.query(
    "select * from users where username=?",
    username
  );
  if (userChecking.length === 0) {
    res.send({ message: "Invalid username" });
  } else {
    let passwordChecking = await bcryptjs.compare(
      password,
      userChecking[0].password
    );
    if (passwordChecking) {
      delete userChecking[0].password;
      req.session.username = username;
      res.send({
        message: `logged in successful welcome back Mr. ${username}`,
      });
    } else {
      res.send({ message: "Invalid password" });
    }
  }
});

app.put("/modify-user", async (req, res) => {
  let { username, password } = req.body;
  let [userCheck] = await db.query(
    "select * from users where username=?",
    username
  );
  if (userCheck[0] == undefined) {
    res.send({ message: "user not exists" });
  } else {
    let hashedPassword = await bcryptjs.hash(password, 4)
    password = hashedPassword
    await db.query("update users set password=?", password);
    req.session.username = username;
    res.send({ message: "user updated" });
  }
});
