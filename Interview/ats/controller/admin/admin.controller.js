const express = require("express");
const Job = require("../../model/job.model");
const Interviewer = require("../../model/interviewer.model");
const Genre = require("../../model/genre.model");
const Login = require("../../model/login.model");
const Schedule = require("../../model/schedule.model");
const sendgrid = require("../../playground/sendgrid.playground");
module.exports = {
  addjob: async (req, res) => {
    let jobInfo = new Job(req.body);
    await Job.count({}, (err, count) => {
      if (err) console.log("Unable to count");
      else jobInfo.jobId = count + 1;
    });
    jobInfo.save((err, res) => {
      if (err) throw err;
      else console.log(res);
    });
    res.status(200).send("Job Added");
  },
  addInterviewer: (req, res) => {
    let interviewerInfo = new Interviewer(req.body);

    interviewerInfo.save((err, data) => {
      if (err) throw err;
      else {
        let loginInfo = new Login();
        loginInfo.email = req.body.email;
        loginInfo.password = req.body.password;
        loginInfo.role = "interviewer";
        loginInfo.userId = interviewerInfo._id;
        loginInfo.save((err, data) => {
          if (err) throw err;
          sendgrid.sendEmail(interviewerInfo.email, interviewerInfo);
        });
      }
    });
    res.status(200).send("Interviewer Added");
  },
  addCategory: async (req, res) => {
    let genreInfo = new Genre();
    genreInfo.category = req.body.category;
    genreInfo.save((err, data) => {
      status = "false";
      if (err) throw err;
      else res.status(200).json({ status: "true" });
    });
  },
  addDesignation: (req, result) => {
    let genreInfo = new Genre();

    Genre.findOne({ category: req.body.category }, (err, res) => {
      if (err) throw err;
      var new_designation = res.designation;
      new_designation = new_designation ? new_designation : [];
      new_designation.push(req.body.designation);
      Genre.updateOne(
        { category: req.body.category },
        { $set: { designation: new_designation } },
        err => {
          if (err) throw err;
          else {
            result.status(200).json({ status: "true" });
          }
        }
      );
    });
  },
  assignInterviewer: (req, res) => {
    let scheduleInfo = new Schedule(req.body);
    scheduleInfo.save((err, data) => {
      if (err) throw err;
      else {
        console.log(data._id);
        res.status(200).send("Interviewer Assigned");
      }
    });
  }
};
