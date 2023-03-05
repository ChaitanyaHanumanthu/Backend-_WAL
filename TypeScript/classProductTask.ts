class Product {
  // constructor
  constructor(
    private product_no: number,
    private name: string,
    private brand: string,
    private mrp: number
  ) {}

  // getters for each one

  get allDetails() {
    return this.product_no, this.name, this.brand, this.mrp;
  }

  // getting product details
  get _product_no() {
    return this.product_no;
  }

  get _name() {
    return this.name;
  }

  get _brand() {
    return this.brand;
  }

  get _mrp() {
    return this.mrp;
  }

  //setting the data
  set _product_no(newProduct) {
    this.product_no = newProduct;
  }

  set _name(newName) {
    this.name = newName;
  }

  set _brand(newBrand) {
    this.brand = newBrand;
  }

  set _mrp(newMrp) {
    this.mrp = newMrp;
  }

  // methods
  getDiscount(discount) {
    this.mrp;
    console.log(
      "The price after discount is: ",
      this.mrp - this.mrp * (discount / 100)
    );
  }
}

let pr1 = new Product(1, "laptop", "dell", 50000); //creating product 1 object
let pr2 = new Product(2, "Mouse", "dell", 799); //creating product 2 object
let pr3 = new Product(3, "Keyboard", "dell", 899); //creating product 3 object
let pr4 = new Product(4, "Charger", "dell", 1499); //creating product 4 object
let pr5 = new Product(5, "Pendrive", "dell", 999); //creating product 5 object

pr1.getDiscount(10);
pr2.getDiscount(5);
pr3.getDiscount(8);
pr4.getDiscount(3);
pr5.getDiscount(4);

pr1._name = "Lapi";

console.log(pr1._mrp);
