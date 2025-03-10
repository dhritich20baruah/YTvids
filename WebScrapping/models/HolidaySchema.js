const mongoose = require("mongoose");

const HolidaySchema = new mongoose.Schema({
    country: String,
    aliases: [String],
    date: String,
    year: Number,
    name: String,
    type: String
})

module.exports = mongoose.model("Holiday", HolidaySchema)