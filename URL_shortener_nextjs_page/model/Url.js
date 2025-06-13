const mongoose = require('mongoose')

const urlSchema = new mongoose.Schema({
    shortCode:{
        type: String
    },
    longUrl: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

mongoose.models = {}
module.exports = mongoose.model('URLS', urlSchema)