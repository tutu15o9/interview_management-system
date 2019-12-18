const express = require("express");
const app = express();
const candidateController = require("./candidate.controller");
const fileSystemUpload = require("../../middlewares/multer/multer.middleware");

app.get("/", (req, res) => {
  res.status(200).send("Candidate is working");
});

app.post("/emailgen", candidateController.createEmail);
app.get("/emailverify/:id", candidateController.matchEmail);
app.post("/otpgen", candidateController.createOtp);

app.get("/otpverify/:candidateId/:otp", candidateController.matchOtp);
app.get("/getassets/:filename", candidateController.getFile);
app.get("/myprofile/:candidateId", candidateController.myProfile);

app.get("/signup", (req, res) => {
  console.log("Get Working ");
  res.status(200).send("Sign up working");
});
// :candidateId/:otp
app.post(
  "/add/uploads/:userId",
  fileSystemUpload.candidateUploads,
  candidateController.addCandidateFiles
);

app.post("/signup", candidateController.signup);

module.exports = app;
