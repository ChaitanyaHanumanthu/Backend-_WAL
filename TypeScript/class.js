// class Student {
//   // fields
//   name: string;
//   roll_no: number;
//   // constructor
//   constructor(name, roll_no) {
//     this.name = name;
//     this.roll_no = roll_no;
//   }
//   //methods
//   // getters and setters
//   // static members
// }
class Student {
    constructor(username, roll_no) {
        this.username = username;
        this.roll_no = roll_no;
    } //parameter properties
    // getters
    get _username() {
        return this.username;
    }
    // setter
    set _username(newUsername) {
        this.username = newUsername;
    }
    // methods
    getData() {
        console.log(this.username, this.roll_no);
    }
}
let std1 = new Student("chaitanya", 909);
// std1.getData();
std1._username = "Chinna"; //setting new username
console.log(std1._username); // again getting the username using getter
