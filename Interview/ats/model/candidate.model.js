const mongoose = require("mongoose");
const candidateSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: Number,
    required: true
  },
  experienceMonth: {
    type: Number,

    default: 0
  },
  experienceYear: {
    type: Number,
    default: 0
  },
  isVerifiedOtp: {
    type: Boolean,
    default: false
  },
  isVerifiedEmail: {
    type: Boolean,
    default: false
  },
  employeer: [
    {
      prevEmployeer: {
        type: String
      },
      joiningDate: {
        type: Date
      },
      leavingDate: {
        type: Date
      },
      role: {
        type: String
      }
    }
  ],
  defaultResumeLink: {
    type: String
  },
  resumeLink: [
    {
      type: String
    }
  ],
  educational: [
    {
      degree: {
        type: String
      },
      completionDate: {
        type: Date
      },
      college: {
        type: String
      }
    }
  ],
  video: {
    type: String
  },
  isActive: {
    type: Boolean,
    default: true
  },
  applied: [
    {
      type: mongoose.Schema.Types.ObjectId
    }
  ]
});
module.exports = mongoose.model("candidate", candidateSchema);
