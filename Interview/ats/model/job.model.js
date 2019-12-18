const mongoose = require("mongoose");
const jobSchema = mongoose.Schema({
  jobId: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  designation: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  blockJobId: [
    {
      type: mongoose.Schema.Types.ObjectId
    }
  ],
  lastDate: {
    type: Date,
    required: true
  },
  isOpen: {
    type: Boolean,
    default: true
  },
  paySalary: {
    type: Number,
    required: true
  },
  location: {
    type: String
  },
  bondDetail: {
    type: String,
    default: "No Bond Period"
  },
  experienceRequired: {
    year: {
      type: Number
    },
    month: {
      type: Number
    }
  },
  skillRequired: [
    {
      skillName: {
        type: String,
        required: true
      },
      skillLevel: {
        type: String,
        required: true
      }
    }
  ],
  isComplete: {
    type: Boolean,
    default: false
  }
});
module.exports = mongoose.model("job", jobSchema);
