const mongoose = require('mongoose')

const quoteSchema = new mongoose.Schema({
    quote:{
        type: String
    },
    date:{
        type: Date,
        default: Date.now
    }
})

mongoose.models = {}
module.exports = mongoose.model('Quote', quoteSchema)