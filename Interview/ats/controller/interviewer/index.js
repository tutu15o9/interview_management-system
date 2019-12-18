const express = require("express");
const app = express();
const interviewerController = require("./interviewer.controller");

app.get("/", (req, res) => {
  res.send("Running");
});
app.get("/:category/:designation", interviewerController.getInterviewer);

module.exports = app;
