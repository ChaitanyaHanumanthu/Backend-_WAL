// importing express async handler
const expressAsyncHandler = require("express-async-handler");

// import models
const { Bank } = require("../models/bank.model");

// importing sequelize
const sequelize = require("../databases/db.config");
const bankApp = require("../routes/bank.routes");
const { where } = require("sequelize");

// defining controllers
const createUser = expressAsyncHandler(async (req, res) => {
  let create = await Bank.create(req.body);
  res.send({ message: "User created" });
});

const depositMoney = expressAsyncHandler(async (req, res) => {
  let { account_number, balance, username } = req.body;

  if (balance >= 1000 && balance <= 10000) {
    let findAcc = await Bank.findOne({
      where: {
        account_number: req.params.account_number,
      },
    });
    if (findAcc != undefined) {
      let upBalance = findAcc.dataValues.balance;
      upBalance += balance;
      balance = upBalance;
      console.log(balance);
      await Bank.update(
        { account_number, username, balance },
        {
          where: {
            account_number: account_number,
          },
        }
      );
      res.send({
        message: "Balance updated",
        payload: `Available balance ${balance}`,
      });
    } else {
      res.send({ message: "No account holder existed" });
    }
  } else {
    res.send({ message: "Deposit money should be in range of 1000 to 10000" });
  }
});

// // withdrawing money
// const withdraw = expressAsyncHandler(async (req, res) => {
//   // get the body
//   let { account_number, username, balance } = req.body;
//   // check withdrawl amount(max:25000 )
//   if (balance > 25000) {
//     res.send({
//       message: "Withdrawl limit is 25000 transaction",
//     });
//   }
//   //
//   else {
//     // check user existence
//     let findAcc = await Bank.findOne({
//       where: {
//         account_number: account_number,
//       },
//     });
//     // if user not found
//     if (findAcc != undefined) {
//       let availableBalance = findAcc.dataValues.balance;
//       console.log("avaiable", availableBalance);
//       // to alert insufficient balance
//       if (availableBalance < balance) {
//         res.send({ message: "Withdrawl failed", err: "Insufficient funds" });
//       }
//       // if balance is available then subtract
//       else {
//         let newBalance = availableBalance - balance;
//         console.log(newBalance);
//         balance = newBalance;
//         // upadte the newBalance
//         let updatedRecord = await Bank.update(
//           { account_number, username, balance },
//           {
//             where: {
//               account_number: account_number,
//             },
//           }
//         );
//         res.send({
//           message: "Withdrwal succeesfull",
//           Balance: `Available balance : ${newBalance}`,
//         });
//       }
//     } else {
//       res.send({ message: "User not found" });
//     }
//   }
//   // if user found
//   // get the balance and check if the balance is available or not
// });

//  lets withdraw the money
const withdrawMoney = expressAsyncHandler(async (req, res) => {
  let { account_number, username, upBalance } = req.body;
  let balance = req.params.balance;

  if (balance >= 25000) {
    res.send({ message: "Withdrawl range is 1000 - 250000" });
  } else {
    let findAcc = await Bank.findOne({
      where: { account_number: req.params.account_number },
    });
    if (findAcc == undefined) {
      res.send({ message: "No one existed" });
    } else {
      // available balance
      let avl_bal = findAcc.dataValues.balance;
      console.log(avl_bal);
      avl_bal -= balance;
      console.log(avl_bal);
      balance = avl_bal;

      await Bank.update(
        { account_number, username, balance },
        { where: { account_number: account_number } }
      );

      res.send({
        message: "The bank withdrawl successful",
        Avl_balance: `Available balance is ${balance}`,
      });
    }
  }
});

// lets transfer the money
exports.transfer = expressAsyncHandler(async (req, res) => {
  const payerRes = await Bank.findOne({
    where: {
      account_no: req.params.from_acc,
    },
  });
  const payeeRes = await Bank.findOne({
    where: {
      account_no: req.params.to_acc,
    },
  });
  if (payerRes.account_balance >= req.body.amount) {
    //calculating payers balance
    payer_total = payerRes.account_balance - req.body.amount;
    //calculating payee balance
    payee_total = payeeRes.account_balance + req.body.amount;
    const t = await sequelize.transaction();
    try {
      await Bank.update(
        { account_balance: payer_total },
        {
          where: {
            account_no: req.params.from_acc,
          },
          transaction: t,
        }
      );

      // //throw error to check transaction
      // throw new Error("error created");

      //update payee account balance
      await Bank.update(
        { account_balance: payee_total },
        {
          where: {
            account_no: req.params.to_acc,
          },
          transaction: t,
        }
      );

      res.send({ message: "Money transfer sucessfull" });

      // We commit the transaction.
      await t.commit();
    } catch (error) {
      // If the execution reaches this line, an error was thrown.
      // We rollback the transaction.
      await t.rollback();
      res.send({ message: "Payment failed , please try again" });
    }
  } else {
    res.send({ message: "Insufficient funds" });
  }
});

const moneyTransfer = expressAsyncHandler(async (req, res) => {
  let { from_acc, to_acc } = req.params;
  let amount = req.body.balance;

  let accountOne = await Bank.findOne({
    where: { account_number: from_acc },
  });
  let accountTwo = await Bank.findOne({
    where: {
      account_number: to_acc,
    },
  });
  console.log(accountOne.dataValues.balance, amount);
  if (accountOne.dataValues.balance >= amount) {
    aNewBal = accountOne.dataValues.balance - amount;
    console.log("Hi");
    bNewBal = accountTwo.dataValues.balance + amount;

    console.log("Bye");

    const t = await sequelize.transaction();
    try {
      await Bank.update(
        { balance: aNewBal },
        {
          where: {
            account_number: from_acc,
          },
          transaction: t,
        }
      );
      throw new Error("Created");
      await Bank.update(
        { balance: bNewBal },
        {
          where: {
            account_number: to_acc,
          },
          transaction: t,
        }
      );

      res.send({ message: "Money transfer Success" });
      await t.commit();
    } catch (error) {
      await t.rollback();
      res.send({ message: "Money failed" });
    }
  } else {
    res.send({ message: "Insufficient balance" });
  }
});

// exporting controllers
module.exports = {
  createUser,
  depositMoney,
  // withdraw,
  withdrawMoney,
  moneyTransfer,
};
