// importing express module
const express = require("express");
const app = express();

//importing express async handler
const expressAsyncHandler = require("express-async-handler");

// importng sequelize from database
const sequelize = require("../databases/db.config");
const db = require("mysql2");

// importing express validator
const { body, validationResult } = require("express-validator");

// Importing a model
const { Student } = require("../models/students.model");
const { Address } = require("../models/address.model");
const { Semester } = require("../models/semester.model");

//Establishing OnetoOne relationship
Student.Address = Student.hasOne(Address, { foreignKey: "roll_no" });
Address.Student = Address.belongsTo(Student, { foreignKey: "roll_no" });

Student.Semester = Student.hasMany(Semester, { foreignKey: "roll_no" });
//Getting all the students from the database
// GET http://localhost:4000/student-api/students

const getStudents = expressAsyncHandler(async (req, res) => {
  let students = await Student.findAll({
    include: [
      { association: Student.Address },
      { association: Student.Semester },
    ],
  });
  res.send({ message: "Students are", students });
});

// Creating student with unique email and checking validations
// POST http://localhost:4000/student-api/student

const createStudent = expressAsyncHandler(async (req, res) => {
  let creation = await Student.create(req.body);
  res.send({ message: "Student created", payload: creation });
});

// Adding student address for the particular student
// POST http://localhost:4000/student-api/student/<roll_no>/address

const studentAddress = expressAsyncHandler(async (req, res) => {
  let addressCheck = await Student.findOne({
    where: { roll_no: req.params.roll_no },
  });
  if (addressCheck != undefined) {
    let addr = await Address.create(req.body);
    await addressCheck.setAddress(addr);
    res.send({
      message: "Address added to particular student",
      payload: addressCheck,
    });
  } else {
    res.send({ message: "No student found" });
  }
});

//Adding students marks to particular student
// POST http://localhost:4000/student-api/student/<roll_no>/sem-marks

const studentMarks = expressAsyncHandler(async (req, res) => {
  let studentsCheck = await Student.findOne({
    where: { roll_no: req.params.roll_no },
  });
  if (studentsCheck != undefined) {
    let marks = await Semester.create(req.body);
    await studentsCheck.setSemesters(marks);
    res.send({
      message: "Marks added to particular student",
      payload: studentsCheck,
    });
  } else {
    res.send({ message: "No student found" });
  }
});

//Getting students bases on the roll number
// GET http://localhost:4000/student-api/students/<roll_no>

const getStudentByRollno = expressAsyncHandler(async (req, res) => {
  const rollnumber = req.params.roll_no;
  let findStudent = await Student.findOne({
    where: {
      roll_no: rollnumber,
    },
    include: [
      { association: Student.Address },
      {
        association: Student.Semester,
      },
    ],
  });
  if (findStudent.status == false) {
    res.send({ message: "The student is deleted" });
  } else {
    res.send({
      message: "The student of this roll number is: ",
      payload: findStudent,
    });
  }
});

// Updating students address
// PUT http://localhost:4000/student-api/student/<roll_no>/new-address

const updateAddress = expressAsyncHandler(async (req, res) => {
  let addressCheck = await Address.findOne({
    where: {
      roll_no: req.params.roll_no,
    },
  });
  if (addressCheck != undefined) {
    let address = await Address.update(req.body, {
      where: {
        roll_no: req.params.roll_no,
      },
    });
    res.send({ message: "Address updated succesfully" });
  } else {
    res.send({ message: "No student found" });
  }
});

// Updating semester marks
// PUT http://localhost:4000/student-api/student/<roll_no>/semester/<sem-id>/new-marks
const updateMarks = expressAsyncHandler(async (req, res) => {
  let rollCheck = await Semester.findOne({
    where: {
      roll_no: req.params.roll_no,
    },
  });
  if (rollCheck != undefined) {
    let semesterCheck = await Semester.findOne({
      where: {
        semester: req.params.semester,
      },
    });
    if (semesterCheck != undefined) {
      let marks = await Semester.update(req.body, {
        where: {
          semester: req.params.semester,
        },
      });
      res.send({ message: "Marks updated succesfully" });
    } else {
      res.send({ message: "No student found" });
    }
  } else {
    res.send({ message: "No one found" });
  }
});

// soft deleting
const deleteStudent = expressAsyncHandler(async (req, res) => {
  let deletion = await Student.findOne(req.body, {
    where: {
      roll_no: req.params.roll_no,
    },
  });
  if (deletion != undefined) {
    await Student.update(req.body, {
      where: {
        roll_no: req.params.roll_no,
      },
    });
    res.send({ message: "User deleted" });
  } else {
    res.send({ message: "No user existed" });
  }
});

const aggregate = expressAsyncHandler(async (req, res) => {
  let [result] = await sequelize.query(
    `select roll_no, (avg((maths+physics+chemistry)/3)*100)/60 as aggregate from semester group by roll_no;`
  );
  console.log(result);
  res.send({
    message: "The aggregate percentage of each student is: ",
    result,
  });
});

// transaction

// const transaction = sequelize.transaction();

const creatingStudent = expressAsyncHandler(async (req, res) => {
  try {
    let creation = await sequelize.transaction(
      {
        name: "Sample",
        dateOfBith: "2020-01-10",
        email: "Sampe@gamil.com",
      },
      { transaction: transaction }
    );
    return creation;
  } catch (err) {}
});

module.exports = {
  getStudents,
  createStudent,
  studentAddress,
  getStudentByRollno,
  studentMarks,
  updateAddress,
  updateMarks,
  creatingStudent,
  deleteStudent,
  aggregate,
};
