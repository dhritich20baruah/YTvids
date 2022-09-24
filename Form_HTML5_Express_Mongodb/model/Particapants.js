const mongoose = require('mongoose')

const participantsSchema = new mongoose.Schema({
    name:{
        type: String,
        require: true
    },
    email:{
        type: String,
        require: true
    },
    phone:{
        type: Number,
        require: true
    },
    topic:{
        type: String,
        require: true
    },
    photo:{
        type: String //filename
    },
    photopath:{
        type: String //location where the file will be uploaded to
    },
    createdAt:{
        type: Date,
        default: Date.now
    }
})

const Participant = mongoose.model('Participant', participantsSchema)

module.exports = Participant