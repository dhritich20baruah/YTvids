const mongoose = require('mongoose')

const cartSchema = new mongoose.Schema({
    userId:{
        type: String,
        required: true
    },
    product: [
        {
            productId: {
                type: String
            },
            quantity: {
                type: Number,
                default: 1
            }
        }
    ]
},
{ timestamps: true }
)

const Cart = mongoose.model('cart', cartSchema);
module.exports = Cart