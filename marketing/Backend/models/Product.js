const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String,
    details: String,
    price: String
})

const ProductData = mongoose.model('productData', productSchema)
module.exports = ProductData