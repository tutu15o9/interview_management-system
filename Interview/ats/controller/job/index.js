const express = require("express");
const app = express();
const jobController = require("./job.controller");

app.get("/", jobController.allJob);

app.get("/:jobid", jobController.jobDetail);

app.post("/apply", jobController.applyJob);

module.exports = app;
