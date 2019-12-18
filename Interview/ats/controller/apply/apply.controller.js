const express = require("express");
const Apply = require("../../model/apply.model");
const Candidate = require("../../model/candidate.model");
const ScheduleModel = require("./../../model/schedule.model");
const Job = require("../../model/job.model");
const mongoose = require("mongoose");
module.exports = {
  getCandidate: (req, res) => {
    Apply.find({ jobId: req.params.jobid, status: "InterviewToBeScheduled" })
      .populate([
        { path: "candidateId", select: "name email", model: "candidate" }
      ])
      .lean()
      .exec((err, applied) => {
        if (err) throw err;
        else {
          console.log("applied");
          console.log(applied);
          res.json(applied);
        }
      });
  },
  applyJob: (req, res) => {
    let applyInfo = new Apply();
    console.log(req.body.candidateId);
    applyInfo.candidateId = req.body.candidateId;
    applyInfo.jobId = req.body.jobId;
    applyInfo.status = "InterviewToBeScheduled";

    Candidate.findById(req.body.candidateId, (err, candid) => {
      if (err) throw err;
      Job.findById(req.body.jobId, (newerr, jobdata) => {
        if (newerr) throw newerr;
        let array1 = candid.applied ? candid.applied : [];
        let array2 = jobdata.blockJobId ? jobdata.blockJobId : [];
        array1.forEach((element, index, array) => {
          array[index] = element.toString();
        });
        array2.forEach((element, index, array) => {
          array[index] = element.toString();
        });

        array2.push(req.body.jobId);
        console.log(" array1 ", array1);
        console.log(typeof array1[0]);
        console.log(typeof array2[0]);
        console.log(" array2 ", array2);
        let intersection = [];
        if (array2 != null && array1 != null)
          intersection = array1.filter(element => {
            console.log(array2.includes(element));
            return array2.includes(element);
          });
        console.log("intersection ", intersection);
        if (intersection.length) {
          res.status(200).send({ status: "notApplied" });
        } else {
          applyInfo.save((lerr, data) => {
            if (err) throw lerr;

            Candidate.findByIdAndUpdate(
              req.body.candidateId,
              { $push: { applied: req.body.jobId } },
              (merr, ndata) => {
                if (merr) throw merr;
                res.status(200).send({ status: "applied" });
              }
            );
          });
        }
      });
    });
  },
  assignInterviewer: (req, res) => {
    console.log(req.body.jobId, req.body.candidateId);

    Apply.findOneAndUpdate(
      {
        jobId: req.body.jobId,
        candidateId: req.body.candidateId
      },
      { $set: { status: "InterviewScheduled" } },
      { new: true },
      (err, saved) => {
        if (err) throw err;
        console.log(saved);
        res.status(200).json({ status: "true" });
      }
    );
  },
  closeApplication: (req, res) => {
    Apply.findOneAndUpdate(
      {
        jobId: req.body.jobId,
        candidateId: req.body.candidateId
      },
      {
        $set: { status: req.body.closeStatus }
      },
      { new: true },
      (err, saved) => {
        console.log(req.body.jobId);
        console.log(req.body.candidateId);
        console.log("@@@@@@", req.body.closeStatus);
        console.log(saved);
        if (err) throw err;
        res.status(200).json(saved);
      }
    );
  },
  getAppliedJob: (req, res) => {
    Apply.find({ candidateId: req.params.candidateId })
      .populate([
        {
          path: "jobId",
          select: "category designation description",
          model: "job"
        }
      ])
      .lean()
      .exec((err, applied) => {
        console.log("all Jobs");
        res.status(200).json(applied);
      });
    // ScheduleModel.populate(
    //   Apply.find({ candidateId: req.params.candidateId }).populate({
    //     path: "jobId",
    //     model: "job"
    //   })
    // ).exec(function(err, d) {
    //   console.log("Resp : ", err, d);
    // });
    // ScheduleModel.find()
    //   .populate(
    //     Apply.find({ candidateId: req.params.candidateId }).populate({
    //       path: "jobId",
    //       model: "job"
    //     })
    //   )
    //   .exec((err, d) => {
    //     console.log(err, d);
    //   });

    // Apply.find({ candidateId: req.params.candidateId })
    //   .populate({
    //     path: "candidateId",
    //     model: "schedule"
    //   })
    //   .populate({
    //     path: "jobId",
    //     model: "job"
    //   })
    //   .exec((err, d) => {
    //     console.log(err, d);
    //   });
  },
  getMyJob: (req, res) => {
    ScheduleModel.find(
      { candidateId: req.params.candidateId, status: "pending" },
      { date: 1, time: 1, candidateId: 1, jobId: 1 },
      (err, response) => {
        if (err) throw err;
        res.status(200).send(response);
      }
    );
  }
};
