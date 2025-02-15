const mongoose = require("mongoose");

const HolidaySchema = new mongoose.Schema({
    country: String,
    date: String,
    name: String,
    type: String
})

module.exports = mongoose.model("Holiday", HolidaySchema)