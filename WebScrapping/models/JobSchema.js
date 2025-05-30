const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema({
    title: String,
    lastDate: String,
    Post: Number,
    description: String,
    category: String,
    advLink: String,
    applyLink: String,
    createdAt: {
        type: Date,
        default: Date.now
    },
})

module.exports = mongoose.model("Job", JobSchema)