const mongoose =  require('mongoose')

const participantsSchema = new mongoose.Schema({
    name:{
        type: String,
        require: true //serverside validation
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
    photo: {
        type: String //filename
    },
    photopath:{
        type: String //location where the file will be stored
    },
    createdAt:{
        type: Date,
        default: Date.now
    }
})

const Participant = mongoose.model('Participant', participantsSchema) //creating a mongoose model and assigning to participant

module.exports = Participant