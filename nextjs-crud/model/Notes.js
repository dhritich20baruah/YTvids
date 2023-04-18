const mongoose = require('mongoose')

const noteSchema = new mongoose.Schema({
    title:{
        type: String,
    }, 
    note:{
        type: String,
    },
    createdAt:{
        type: Date,
        default: Date.now
    }
})

mongoose.models ={}
module.exports = mongoose.model('Notes', noteSchema)