// importing express module
const exp = require("express");
const app = exp();

//importing express async handler
const expressAsyncHandler = require("express-async-handler");

// importng sequelize from database
const sequelize = require("../databases/db.config");

// importing product model
const { Product } = require("../models/products.model");

// getting al products
const getProduct = expressAsyncHandler(async (req, res) => {
  res.send({ message: "Message from product router" });
});

// creating products
const createProduct = expressAsyncHandler(async (req, res) => {
  console.log(req.body);
  await Product.create(req.body);
  res.send({ message: "Product created" });
});

// exporting product controlelrs
module.exports = { getProduct, createProduct };
