// importing epxress
const express = require("express");

// importing custoer route
const customerApp = express.Router();

// importing controllers
const {
  getCustomer,
  createCustomer,
  createReview,
  reviewByCustomerId,
  createOrder,
  orderById,
  addAddress
} = require("../controllers/customer.controller");

// body parsers
customerApp.use(express.json());

// Route for getting
customerApp.get("/customer", getCustomer);

// route for create customer
customerApp.post("/customer", createCustomer);

// route for create a review
customerApp.post("/customer-review", createReview);

//route for getting reviews by customer id
customerApp.get("/customer-review/:customer_id", reviewByCustomerId);

//route for create orders
customerApp.post("/customer-order", createOrder);

//route for getting orders by customer id
customerApp.get("/customer-order/:customer_id", orderById);

//route for creating address
customerApp.post("/add-address", addAddress)

// exporting customer app router
module.exports = customerApp;
