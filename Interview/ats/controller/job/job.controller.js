const Job = require("../../model/job.model");
const Apply = require("../../model/apply.model");
const mongoose = require("mongoose");
let allJobList = [];

module.exports = {
  allJob: async (req, res) => {
    await Job.find({}, (err, data) => {
      if (err) throw err;
      else {
        allJobList = data;
        res.status(200).send(allJobList);
      }
    });
  },
  applyJob: async (req, res) => {
    let applyInfo = new Apply(req.body);
    await applyInfo.save((err, data) => {
      if (err) throw err;
      else {
        console.log(data._id);
        res.status(200).send("Job applied");
      }
    });
  },
  jobDetail: async (req, res) => {
    let jobDetailInfo = new Job();
    await Job.findById(
      mongoose.Types.ObjectId(req.params.jobid),
      (err, res) => {
        if (err) throw err;
        else jobDetailInfo = res;
      }
    );
    res.status(200).send(jobDetailInfo);
  }
};
