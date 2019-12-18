const express = require("express");
const app = express();
const router = require("./route/router");
const mongoose = require("mongoose");
const url = "mongodb://localhost:27017/ats";
const mongoOptions = { useNewUrlParser: true };
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(router);

mongoose.connect(url, mongoOptions, err => {
  if (err) throw err;
  else console.log("connected to mongodb...");
});

const PORT = 8000;

app.get("/", (req, res) => {
  res.send("hbsjh");
});
app.listen(PORT, () => {
  console.log("App working on 8000");
});

// const Candidate = require("./model/candidate.model");

// const myObj = {};
// let candidate = new Candidate({
//   name: "Rahul",
//   email: "rahul@gmail.com",
//   password: "123",
//   phoneNumber: 1234567890,
//   experience: {
//     month: 0,
//     year: 0
//   }
// });
// candidate.save((err, res) => {
//   if (err) throw err;
//   else console.log(res);
// });
