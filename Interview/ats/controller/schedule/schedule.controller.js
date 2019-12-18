const Schedule = require("../../model/schedule.model");
allSchedule = [];
allInterviewerSchedule = [];
module.exports = {
  getCandidateHistory: (req, res) => {
    Schedule.find({
      candidateId: req.params.candidateId,
      jobId: req.params.jobId
    })
      .populate({
        path: "interviewerId",
        select: " email",
        model: "interviewer"
      })
      .lean()
      .exec((err, data) => {
        if (err) throw err;
        else {
          allSchedule = data;
        }
        res.status(200).send(allSchedule);
      });
  },
  getInterviewerSchedule: (req, res) => {
    Schedule.find(
      {
        interviewerId: req.params.interviewerId,
        status: "pending"
      },
      (err, applied) => {
        if (err) throw err;
        else {
          console.log("schedule");
          res.json(applied);
        }
      }
    );
  },

  rejectSchedule: (req, res) => {
    Schedule.findByIdAndUpdate(
      req.params.scheduleId,
      { $set: { status: "reject" } },
      (err, data) => {
        if (err) throw err;
        res.status(200).send(data);
      }
    );
  },
  submitResponse: (req, res) => {
    console.log(req.body);
    Schedule.findByIdAndUpdate(
      req.body._id,
      {
        $set: { status: "success", comment: req.body.comment }
      },
      (err, data) => {
        if (err) throw err;
        res.status(200).send(data);
      }
    );
  },
  getCandidateLatest: (req, res) => {
    Schedule.findOne(
      {
        candidateId: req.params.candidateId,
        jobId: req.params.jobId,
        status: "pending"
      },
      (err, scheduleInfo) => {
        if (err) throw err;
        console.log(scheduleInfo);
        res.status(200).json(scheduleInfo);
      }
    );
  }
};
