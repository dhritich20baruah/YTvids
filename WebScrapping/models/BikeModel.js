const mongoose = require("mongoose");

const BikeSchema = new mongoose.Schema({
    name: String,
    image: String,
    price: String,
    displacement: String,
    power: String,
    average: String,
    type: String,
    kerbWeight: String,
})

module.exports = mongoose.model("Bikes", BikeSchema)