// creating buffer

// let buf = Buffer.from("abcd");

// console.log(buf.toString());

let fs = require("fs");

const readFileNormally = () => {
  fs.readFile("./sample.txt", (err, data) => {
    console.log(data.toString());
  });
};

const readFileStreaming = () => {
  let readStream = fs.createReadStream("./sample.txt");
  let writeStream = fs.createWriteStream("./data.txt");
  readStream.addListener("data", (chunk) => {
    console.log(chunk.length);
    writeStream.write(chunk);
  });
};
// readStream();
// readFileStreaming();

const getDataFromApi = async () => {
  let writeStream = fs.createWriteStream("./data.txt");
  let data = await fetch("https://jsonplaceholder.typicode.com/users");
  // data.body gives readable stream
  let dataStream = data.body;
  for await (chunk of dataStream) {
    writeStream.write(Buffer.from(chunk).toString());
  }
};

getDataFromApi();


