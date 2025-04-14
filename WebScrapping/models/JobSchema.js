const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema({
    title: String,
    lastDate: String,
    Post: Number,
    category: String,
    advLink: String,
    applyLink: String,
})

module.exports = mongoose.model("Job", JobSchema)