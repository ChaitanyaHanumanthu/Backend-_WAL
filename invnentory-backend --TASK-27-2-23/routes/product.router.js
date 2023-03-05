// importing express module
const exp = require("express");

// product router
const productApp = exp.Router();

// importing controllers from product controller
const {
  getProduct,
  createProduct,
} = require("../controllers/product.controller");

//route for getting products
productApp.get("/product", getProduct);

// route for creating products
productApp.post("/product", createProduct);

// exporting product app
module.exports = productApp;
