const mongoose = require("mongoose");
const scheduleSchema = mongoose.Schema({
  date: {
    type: Date,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  candidateId: {
    type: mongoose.Types.ObjectId,
    required: true
  },
  interviewerId: {
    type: mongoose.Types.ObjectId,
    required: true
  },
  jobId: {
    type: mongoose.Types.ObjectId,
    required: true
  },
  comment: {
    type: String,
    default: ""
  },
  status: {
    type: String,
    default: "pending"
  }
});
module.exports = mongoose.model("schedule", scheduleSchema);
