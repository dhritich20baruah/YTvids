const mongoose = require('mongoose');

const participantSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
    },
    phone: {
        type: Number,
        require: true,
    },
    topic:{
        type: String,
        require: true,
    },
    photo: {
        type: String
    },
    photopath: {
        type: String
    },
    date:{
        type: Date,
        default: Date.now
    }
})

const Participant = mongoose.model('Participant', participantSchema);

module.exports = Participant
