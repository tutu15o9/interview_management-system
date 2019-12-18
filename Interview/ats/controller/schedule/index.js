const express = require("express");
var app = express();
const scheduleController = require("./schedule.controller");

app.post("/submitresponse", scheduleController.submitResponse);
app.get("/reject/:scheduleId", scheduleController.rejectSchedule);
app.get("/pending/:jobId/:candidateId", scheduleController.getCandidateLatest);
app.get("/:interviewerId", scheduleController.getInterviewerSchedule);
app.get("/:jobId/:candidateId", scheduleController.getCandidateHistory);

module.exports = app;
