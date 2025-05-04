const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema({
  title: { type: String },
  lastDate: { type: String },
  Post: { type: Number },
  description: { type: String },
  category: { type: String },
  advLink: { type: String },
  applyLink: { type: String },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

mongoose.models = {}
module.exports = mongoose.model("Job", JobSchema);
