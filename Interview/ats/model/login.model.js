const mongoose = require("mongoose");
const loginSchema = mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String
  },
  userId: {
    type: mongoose.Types.ObjectId
  },
  attempts: {
    type: Number,
    default: 5
  },
  isActive: {
    type: String,
    default: true
  },
  passwordExpiryDate: {
    type: Date,
    default: new Date() + 90 * 24 * 60 * 60 * 1000
  }
});
module.exports = mongoose.model("login", loginSchema);
