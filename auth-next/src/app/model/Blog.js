import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
    title:{
        type: String
    },
    body:{
        type: String
    },
    image:{
        type: String
    },
    date:{
        type: Date,
        default: Date.now
    }
})

mongoose.models = {}
module.exports = mongoose.model('Blog', blogSchema)