const mongoose = require("mongoose");
const sessionSchema = mongoose.Schema({
  role: {
    type: String,
    required: true
  },
  userId: {
    type: String,
    required: true
  },
  token: {
    type: String,
    required: true
  },
  loginTime: {
    type: Date,
    required: true
  },
  lastActivity: {
    type: Date,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  browserPlatform: {
    type: String
  }
});
module.exports = mongoose.model("session", sessionSchema);
