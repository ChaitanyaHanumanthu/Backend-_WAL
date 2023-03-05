// //importing express module
// const exp = require("express");
// const app = exp();

//importing express asyync handler
const expressAsyncHandler = require("express-async-handler");
const { Association, where } = require("sequelize");

//sequelize from database config
const sequelize = require("../databases/db.config");

//importing  models
const { Customer } = require("../models/customer.model"); //importing customer model
const { Product } = require("../models/products.model"); //importing product model
const { Reviews } = require("../models/reviews.model"); // importing reviews model
const { Orders } = require("../models/orders.model"); //importing orders model
const { Address } = require("../models/address.model");

//estalishing many to many relationship for customer and product through reviews using customer id
Customer.Product = Customer.belongsToMany(Product, {
  through: Reviews, //junction table
  foreignKey: "customer_id",
  timestamps: false,
});

//estalishing many to many relationship for product and customer through reviews using productId
Product.Customer = Product.belongsToMany(Customer, {
  through: Reviews, //junction table
  foreignKey: "product_id",
  timestamps: false,
});
//

//Orders
//estalishing many to many relationship for customer and product through orders using customer id
Customer.Product = Customer.belongsToMany(Product, {
  through: Orders, //junction table
  foreignKey: "customer_id",
  timestamps: false,
});

//estalishing many to many relationship for product and customer through Orders using productId
Product.Customer = Product.belongsToMany(Customer, {
  through: Orders, //junction table
  foreignKey: "product_id",
  timestamps: false,
});

//establishing one to one relationship between customer and address
Customer.Address = Customer.hasOne(Address, { foreignKey: "custome_id" });

//getting the customer details
const getCustomer = expressAsyncHandler(async (req, res) => {
  let customers = await Customer.findAll();
  res.send({ message: "Message from customer", payload: customers });
});

//creating customer
const createCustomer = expressAsyncHandler(async (req, res) => {
  //creating customer with the body
  await Customer.create(req.body);
  res.send({ message: "Customer Created" });
});

// creating review for a product
const createReview = expressAsyncHandler(async (req, res) => {
  let reviews = await Reviews.create(req.body, {
    include: [{ association: Customer.Product }],
  });
  res.send({ message: "review added", payload: reviews });
});

// Getting customer reviews by id
const reviewByCustomerId = expressAsyncHandler(async (req, res) => {
  //getting customer id by req body
  let customerById = req.params.customer_id;
  let result = await Reviews.findAll({
    // excluding the customer id from the body
    attributes: { exclude: ["customer_id"] },
    where: {
      customer_id: customerById,
    },
  });
  res.send({
    message: "Reviews by the customer",
    customer_id: req.params.customer_id,
    reviews: result,
  });
});

// creating order for a customer
const createOrder = expressAsyncHandler(async (req, res) => {
  let orders = await Orders.create(req.body, {
    include: [{ association: Customer.Product }],
  });
  res.send({ message: "Order created", payload: orders });
});

//getting orders based on customer id
const orderById = expressAsyncHandler(async (req, res) => {
  let orders = await Orders.findAll({
    attributes: { exclude: ["customer_id"] },
    where: {
      customer_id: req.params.customer_id,
    },
  });
  res.send({
    message: "Orders by customer",
    customer_id: req.params.customer_id,
    orders: orders,
  });
});

//Adding address to address table if exists,
//or create a new customer
const addAddress = expressAsyncHandler(async (req, res) => {
  console.log("Sample");

  // checking email in customers table
  const emailCheck = await Customer.findOne({
    attributes: { exclude: "customer_email" },
    where: { customer_email: req.body.customer_email },
  });
  console.log("Customer is", emailCheck);

  //if email is found, adding address to the address table
  if (emailCheck != undefined) {
    let address = await Address.create(req.body.address);
    console.log(Customer.Address);
    //setting address
    let row = await emailCheck.setAddress(address);
      res.send({ message: "Address added in address model", payload: address });
  } else {
    let address = await Customer.create(req.body, {
      include: [{ association: Customer.Address }],
    });
    res.send({ message: "new customer created" });
  }
});

// exporting the controllers
module.exports = {
  getCustomer,
  createCustomer,
  createReview,
  reviewByCustomerId,
  createOrder,
  orderById,
  addAddress,
};
