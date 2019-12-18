const mongoose = require("mongoose");
const applySchema = mongoose.Schema({
  jobId: {
    type: mongoose.Types.ObjectId,
    required: true
  },
  candidateId: {
    type: mongoose.Types.ObjectId,
    required: true
  },
  status: {
    type: String,
    default: "InterviewToBeScheduled"
  }
});
module.exports = mongoose.model("apply", applySchema);
