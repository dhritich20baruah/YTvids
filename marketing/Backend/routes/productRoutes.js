const express = require('express')
const router = express.Router
const checker = require('../config/checker')
const Product = require('../models/Product')
const mongoose = require('mongoose')

//Route 1: Save products
router.post('/addProducts', async (req, res)=>{
    console.log(req.body)
    const name = req.body.name
    const image = req.body.image
    const description = req.body.description
    const details = req.body.details
    const price = req.body.price

    const newProduct = new Product({
        name, image, description, details, price
    })
    newProduct.save((err, data)=>{
        if(err){
            console.log(err)
        }
        res.send('OK')
    })
    console.log(newProduct)
})

module.exports = router