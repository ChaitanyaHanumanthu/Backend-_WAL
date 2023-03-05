// interfaces

interface Student {
  name: string; //Making the name as readonly property
  roll_no: number;
}

// again same interface
interface Student {
  class?: number; //Making this as optional
}

//using own interface
let s1: Student = {
  name: "Chaitanya",
  roll_no: 909,
  class: 6,
};

s1.name = "Chinna";

console.log(s1);

// Types
// Type-1 User
type User = {
  usernmae: string;
  userId: number;
};

// type using
let u1: User = {
  usernmae: "Chinna",
  userId: 789,
};

let u2: User = {
  usernmae: "sekhar",
  userId: 909,
};

// Type-2 customer
type customer = {
  customer_id: string | number;
  name: string;
  address: string;
};

let c1: customer = {
  customer_id: "Chai909",
  name: "Chinna",
  address: "sklm",
};

// console.log(u2, c1);
