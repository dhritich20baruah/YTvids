const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const passport = require('passport')

//Load model
const Customer = require('../models/Customer')

//Register
router.post('/SignUp', async (req, res)=>{
    const {name, number, email, password} = req.body;
    const newCustomer = await new Customer({
        name, number, email, password
    })
    bcrypt.genSalt(10, (err, salt)=>{
        bcrypt.hash(newCustomer.password, salt, (err, hash)=>{
            newCustomer.password = hash;
            newCustomer.save().then(customer =>{
                res.json({status:'OK'})
            })
            .catch(err=>console.log(err))
        })
    })
    console.log(newCustomer)

});

module.exports = router