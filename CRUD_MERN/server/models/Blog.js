const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
    title:{
        type: String,
    },
    snippet:{
        type: String,
    },
    blogBody:{
        type: String
    },
    createdAt:{
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Blog', blogSchema)