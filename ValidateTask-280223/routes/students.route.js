// importing express module
const { Router } = require("express");
const express = require("express");

// product router
const StudentApp = express.Router();

// express async handler

const expressAsyncHandler = require("express-async-handler");

// importing controllers from the controller
const {
  getStudents,
  createStudent,
  studentAddress,
  getStudentByRollno,
  studentMarks,
  updateAddress,
  updateMarks,
  deleteStudent,
  aggregate,
} = require("../controllers/students.controller");

// Body parser
StudentApp.use(express.json());

// Defining routes
StudentApp.get("/students", getStudents);
StudentApp.post("/students", createStudent);
StudentApp.post("/:roll_no/address", studentAddress);
StudentApp.get("/student/:roll_no", getStudentByRollno);
StudentApp.post("/:roll_no/mark", studentMarks);
StudentApp.put("/:roll_no/new-address", updateAddress);
StudentApp.put("/:roll_no/semester/:semester/new-marks", updateMarks);
StudentApp.put("/student/:roll_no", deleteStudent);
StudentApp.get("/student-with-aggregate", aggregate);

// importing express validator
const { body, validationResult } = require("express-validator");
const { Student } = require("../models/students.model");

StudentApp.post(
  "/studentsvalid",
  body("name").isLength({ min: 2 }),
  body("email").isEmail(),
  body("DateOfBirth").isDate(),
  expressAsyncHandler(async (req, res) => {
    const errors = validationResult(req);
    res.send({ errors: errors });
    if (errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    } else {
      await Student.create({
        name: req.body.name,
        email: req.body.email,
        DateOfBirth: req.body.DateOfBirth,
      });
      res.send({ message: "Success" });
    }
  })
);

// Exporting student app
module.exports = StudentApp;
