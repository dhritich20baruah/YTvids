const mongoose = require('mongoose')

const querySchema = new mongoose.Schema({
    name: String,
    number: Number,
    email: String,
    query: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Query', querySchema)