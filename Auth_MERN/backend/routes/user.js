const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const fetcher = require('../config/fetcher')

const JWT_SECRET = 'secret_123'

//Load model
const User = require('../models/User')

router.post('/signUp', async (req,res)=>{
   try{
    let user = await User.findOne({ email: req.body.email })
    if(user){
        return res.status(400).json({ status: 'error', error: "Sorry a user with this email already exist"})
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    let newUser = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    })
    const token = jwt.sign(
        {
            name: newUser.name,
            email: newUser.email,
            id: newUser.id
        },
        JWT_SECRET
    )
    return res.json({ status: 'OK', token })
   }
   catch(err){
    res.status(500).json({ status: 'error', error: "Internal server error"})
   }
})

router.post('/signIn', async (req, res)=>{
    const user = await User.findOne({
        email: req.body.email
    })
    const userInfo = await User.findOne({
        email: req.body.email
    }).select("-password")
    if(!user){
        return {status: 'User not found'}
    }
    const validation = await bcrypt.compare(req.body.password, user.password)
    if(validation){
        const token = await jwt.sign(
            {
                id: user.id
            },
            JWT_SECRET
        )
        return res.json({ userInfo, token })
    }else{
        return res.json({ status: 'error', user: false})
    }
})

router.post('/getuser', fetcher, async (req, res)=>{
    console.log("ping")
    try{
        let userId = req.user
        const user = await User.findOne(userId).select("-password")
        res.send(user)
    }
    catch(error){
        console.error(error.message)
        res.status(500).send("Internal server error occured")
    }
})

module.exports = router