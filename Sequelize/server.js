const exp = require("express");

const app = exp();

require("dotenv").config();

//assigning port number
const PORT = process.env.PORT;

app.listen(PORT, () => console.log(`Port initiated at ${PORT}`));

// importing error handlers
const expressAsyncHandler = require("express-async-handler");

//Database
//importing sequelize
const { Sequelize, Op, Association, Model } = require("sequelize");

// //importing model
// const { Customer } = require("./models/customer.model");

// //importing user model
// const { User } = require("./models/users.model");

// //importing persons and skill model
// const { Person } = require("./models/person.model");
// const { Skill } = require("./models/skill.model");

//importing employee and job
const { Employee } = require("./models/employee.model");
const { Job } = require("./models/job.model");

//importing cust and accounts model
const { Cust } = require("./models/cust.model");
const { Accounts } = require("./models/accounts.model");

//creating instance
const sequelize = require("./db/db.config");

//testing db connection
sequelize
  .authenticate() //Used to test the connection
  .then(() => {
    console.log("Connection established");
  })
  .catch((err) => {
    console.log("Error is at db connection", err);
  });
sequelize.sync({ force: true });

//body parser
app.use(exp.json());

let a = function () {
  // getting all customers
  app.get(
    "/get-customers",
    expressAsyncHandler(async (req, res) => {
      let customers = await Customer.findAll({
        where: {
          customerId: {
            [Op.ne]: 2,
          },
        },
      });
      res.send({ message: "All customers data: ", payload: customers });
    })
  );

  //getting customers by primary key
  app.get(
    "/customers/:customerId",
    expressAsyncHandler(async (req, res) => {
      let customerByPk = await Customer.findByPk(req.params.customerId);
      console.log(customerByPk);
      res.send({
        message: "The customer by the primary key",
        payload: customerByPk,
      });
    })
  );

  //getting customers by names
  app.get(
    "/customers/name/:customerName",
    expressAsyncHandler(async (req, res) => {
      let customerByName = await Customer.findOne({
        where: { customerName: req.params.customerName },
      });
      res
        .status(200)
        .send({ message: "Customer data", payload: customerByName });
    })
  );

  //creting customers
  app.post(
    "/create-users",
    expressAsyncHandler(async (req, res) => {
      // getting customer from client
      let newCustomer = req.body;

      // checking wheather the table is exited or not

      // // building row in database using model
      // let cust = Customer.build(req.body);
      // console.log(cust.toJSON());

      // //inserting into dataBase
      // await cust.save();

      // combining both build and saving => create
      let result = await Customer.create(req.body);

      // returns the meta data along with the json data
      console.log(result);

      res.send({ message: "New customer created" });
    })
  );

  // Updating customers
  app.put(
    "/update-customer",
    expressAsyncHandler(async (req, res) => {
      let update = await Customer.update(req.body, {
        where: {
          customerId: req.body.customerId,
        },
      });
      console.log(update);
      if (update == 0) res.send({ message: "No customer found to update" });
      else res.send({ message: "customer updated" });
    })
  );

  //delete customer by customerId
  app.delete(
    "/delete-customer/:cust_id",
    expressAsyncHandler(async (req, res) => {
      let deleteCount = await Customer.destroy({
        where: { customerId: req.params.cust_id },
      });
      if (deleteCount == 0) {
        res.send({ message: "No customer found to delete" });
      } else {
        res.send({ message: "Customer deleted" });
      }
    })
  );

  //Getting all the users from user table

  app.get(
    "/get-users",
    expressAsyncHandler(async (req, res) => {
      let users = await User.findAll();
      res.send({ message: "All users ", payload: users });
    })
  );

  //creating users
  app.post(
    "/create-user",
    expressAsyncHandler(async (req, res) => {
      let newUser = req.body;
      let createUser = await User.create(newUser);
      res.send({ message: "User Created ", payload: newUser });
    })
  );

  //update user
  app.put(
    "/update-user/",
    expressAsyncHandler(async (req, res) => {
      await User.update(req.body, {
        where: {
          id: req.body.id,
        },
      });
      res.send({ message: " user updated" });
    })
  );

  app.delete(
    "/delete-user/:id",
    expressAsyncHandler(async (req, res) => {
      let deleteCount = await User.destroy({
        where: { id: req.params.id },
      });
      if (deleteCount == 0) {
        res.send({ message: "No User found to delete" });
      } else {
        res.send({ message: "User deleted" });
      }
    })
  );

  // error handlers
  // app.use((err, req, res, next) => {
  //   let errorMsg = err.message.split("\n");
  //   res.send({ err_msg: " " + errorMsg[1].split(":")[1] });
  // });

  //person creating
  app.post(
    "/person",
    expressAsyncHandler(async (req, res) => {
      await Person.create(req.body);
      res.send({ message: " User created" });
    })
  );

  //skill creating
  app.post(
    "/skill",
    expressAsyncHandler(async (req, res) => {
      await Skill.create(req.body);
      res.send({ message: " Skill updated" });
    })
  );

  //updating skill
  app.put(
    "/update-skill",
    expressAsyncHandler(async (req, res) => {
      await Skill.update(req.body, {
        where: {
          skill_Id: req.body.skill_id,
        },
      });
      res.send({ message: "Skill updated" });
    })
  );
};

// //creating employee using hard code method
// app.post(
//   "/create-emp",
//   expressAsyncHandler(async (req, res) => {
//     let { emp_id, emp_name, job_id, job_name } = req.body;

//     let emp = await Employee.create({ emp_id: emp_id, emp_name: emp_name });

//     let job = await Job.create({
//       job_id: job_id,
//       job_name: job_name,
//     });
//     emp.setJob(job);
//     res.send({ message: "employee created" });
//   })
// );

Employee.Job = Employee.hasOne(Job, { foreignKey: { name: "empId" } });
// Job.belongsTo(Employee, { foreignKey: { name: "empId" } });

//creating employee using association

app.post(
  "/create-emp",
  expressAsyncHandler(async (req, res) => {
    await Employee.create(req.body, {
      include: [{ association: Employee.Job }],
    });
    res.send({ message: "employee created" });
  })
);

//create-job
app.post(
  "/create-job",
  expressAsyncHandler(async (req, res) => {
    await Job.create(req.body);
    res.send({ message: "job created" });
  })
);

Cust.Accounts = Cust.hasMany(Accounts, { foreignKey: { name: "custId" } });
// Accounts.belongsTo(Cust, { foreignKey: { name: "custId" } });

// app.post(
//   "/create-customer",
//   expressAsyncHandler(async (req, res) => {
//     let { cust_id, cust_name, bank_name, account_number } = req.body;
//     let cust = await Cust.create({ cust_id: cust_id, cust_name: cust_name });

//     let = account = await Accounts.create({
//       bank_name: bank_name,
//       account_number: account_number,
//     });

//     cust.setAccounts(account);
//     res.send({ message: "Customer Created" });
//   })
// );

app.post(
  "/create-customer",
  expressAsyncHandler(async (req, res) => {
    await Cust.create(req.body, { include: [{ association: Cust.Accounts }] });
    res.send({ message: "Cust created" });
  })
);

const { Usr } = require("./models/usr.model");
const { Usradrs } = require("./models/useradrs.model");
const { Usrskill } = require("./models/usrskill.model");
const { Usrcontact } = require("./models/contact.model");

Usr.Usradrs = Usr.hasOne(Usradrs, { foreignKey: { name: "user_id" } });
Usr.Usrskill = Usr.hasMany(Usrskill, { foreignKey: { name: "user_id" } });
Usradrs.Usrcontact = Usradrs.hasOne(Usrcontact, {
  foreignKey: { name: "user_id" },
});

//creating user along with address
app.post(
  "/create-usr",
  expressAsyncHandler(async (req, res) => {
    await Usr.create(req.body, {
      include: [
        {
          association: Usr.Usradrs,
          include: [
            {
              association: Usradrs.Usrcontact,
            },
          ],
        },
        {
          association: Usr.Usrskill,
        },
      ],
    });
    console.log(Usr.Usradrs);
    console.log(Usr.Usrskill);
    console.log(Usr.Usrcontact);

    res.send({ message: "it is created" });
  })
);

// getting data
app.get(
  "/get-usr",
  expressAsyncHandler(async (req, res) => {
    let user = await Usr.findAll({
      include: [
        {
          model: Usradrs,
          include: [
            {
              model: Usrcontact,
            },
          ],
        },

        {
          model: Usrskill,
        },
      ],
    });
    res.send({ message: "User data", payload: user });
  })
);

//employee creating
app.get(
  "/get-employee",
  expressAsyncHandler(async (req, res) => {
    let [employees] = await Employee.findAll();

    // include: Job,
    // // {
    // //   model: Job,
    // //   attributes: ["job_name"],
    // // },

    employees.toJSON();
    let jobs = await employees.getJob();
    console.log(jobs.toJSON());
    res.send({ message: "employeees are: ", payload: employees });
  })
);

//lazy loading
app.get(
  "/get-usr-lazy",
  expressAsyncHandler(async (req, res) => {
    let [users] = await Usr.findAll();
    users.toJSON();
    let address = await users.getUsradr();
    res.send({ message: "users are: ", payload: users });
  })
);
//error handling middle ware
app.use((err, req, res, next) => {
  console.log(err);
  res.send({ errmsg: "Error is " + err + " " });
});
