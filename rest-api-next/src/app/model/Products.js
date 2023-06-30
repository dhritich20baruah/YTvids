const mongoose = require('mongoose')

const productsSchema = new mongoose.Schema({
    name:{
        type: String
    },
    brand:{
        type: String
    },
    price:{
        type: String
    },
    quantity:{
        type: String
    },
    date:{
        type: Date,
        default: Date.now
    }
})

mongoose.models = {}
module.exports = mongoose.model('Products', productsSchema)