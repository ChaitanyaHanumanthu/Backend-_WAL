function sum(a: number, b: number, c: number = 9): void {
  console.log(a + b + c);
  // return a;
}

// let sol = sum(2, 3);

// Create Employee type with firstName,LastName, age and Basic.

interface Employee {
  firstname: string;
  lastname: string;
  age: number;
  basic: number;
  hra: number;
  da: number;
 }

let e1: Employee = {
  firstname: "Chaitanya",
  lastname: "Hanumanthu",
  age: 21,
  basic: 10000,
  hra: 15,
  da: 10,
};

// 2nd employee
let e2: Employee = {
  firstname: "Chinna",
  lastname: "Hanumanthu",
  age: 20,
  basic: 20000,
  hra: 15,
  da: 10,
};

// 3rd employee
let e3: Employee = {
  firstname: "sekhar",
  lastname: "kinthali",
  age: 23,
  basic: 15000,
  hra: 15,
  da: 10,
};

function empSal(a: Employee): void {
  console.log(
    "salary =",
    a.basic + a.basic * (a.hra / 100) + a.basic * (a.da / 100)
  );
}

// Create a function which receive employ type object as arg and return the salary of him

let salary = empSal(e1);
// console.log("Salary of the employee is: ", salary);

// Write another function that receives an array of employee objects as arg and return the emp with lowest salary

function arrayEmp(a: Employee[]): void {
  a.forEach((element) => {
    console.log(element.firstname);
  });
}

console.log(arrayEmp([e1, e2, e3]));
