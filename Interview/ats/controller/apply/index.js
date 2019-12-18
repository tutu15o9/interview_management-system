const express = require("express");
var app = express();
const applyController = require("./apply.controller");

app.post("/", applyController.applyJob);

app.get("/assign", (req, res) => {
  res.send("Working");
});

app.post("/assign", applyController.assignInterviewer);

app.post("/assign/close", applyController.closeApplication);
app.get("/candidate/myjob/:candidateId", applyController.getMyJob);

app.get("/candidate/:candidateId", applyController.getAppliedJob);

app.get("/:jobid", applyController.getCandidate);

module.exports = app;
