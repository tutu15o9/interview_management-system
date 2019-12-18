const express = require("express");
const app = express();
const adminController = require("./admin.controller");

app.get("/addjob", (req, res) => {
  res.status(200).send("Adding Jobs get");
});

app.post("/addjob", adminController.addjob);

app.get("/addinterviewer", (req, res) => {
  res.status(200).send("Add Interviewers get");
});

app.post("/addinterviewer", adminController.addInterviewer);

app.get("/addcategory", (req, res) => {
  res.status(200).send("Add Category get ....");
});
app.post("/addcategory", adminController.addCategory);

app.post("/adddesignation", adminController.addDesignation);

app.post("/assigninterviewer", adminController.assignInterviewer);

module.exports = app;
