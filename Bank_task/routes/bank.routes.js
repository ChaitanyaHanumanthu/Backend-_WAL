// importing express
const express = require("express");

// setting router
const bankApp = express.Router();

// importing controllers
const {
  createUser,
  withdraw,
  makeDepositNow,
  depositMoney,
  withdrawMoney,
  moneyTransfer,
} = require("../controllers/bank.controller");

// defining routes
bankApp.post("/user", createUser);

// deposit the cash
bankApp.put("/deposit/:account_number", depositMoney);

// withdrawl
bankApp.put("/withdraw/:account_number/amount/:balance", withdrawMoney);

// put http://localhost:4000/bank-api/transfer/:account-a/to/account-b/money/:amount

bankApp.put("/transfer/from/:from_acc/to/:to_acc", moneyTransfer);

// transfering the money from usera to userb

// exporting router
module.exports = bankApp;
