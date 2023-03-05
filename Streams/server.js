// importing express app
const app = require("express")();

const fs = require("fs");

app.listen(5000, () => {
  console.log("Port setted up");
});


// reading data from normal file
app.get("/read-file-normally", (req, res) => {
  fs.readFile("./sample.txt", (err, data) => {
    if (err) {
      console.log(err);
    } else res.send({ message: data.toString() });
  });
});

// reading from file in streams

app.get("/read-from-streams", (req, res) => {
  let read = fs.createReadStream("./data.txt");
  read.pipe(res);  // res is writable stream
});
