const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
const PORT = 5000;
const app = express();
const bcrypt = require('bcryptjs')
const passport = require('passport')
const session = require('express-session')
const jwt = require('jsonwebtoken')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))

//Connect to mongoose
mongoose.connect('mongodb://localhost/marketing',{
    useNewUrlParser: true, useUnifiedTopology: true
}).then(()=>console.log('DB Connected')).catch(err=>console.log(err))

//Query
const Query = require('./models/Query');

app.post('/newQuery', (req, res)=>{
    const name = req.body.name
    const number = req.body.number
    const email = req.body.email
    const query = req.body.query

    const newQuery = new Query({
        name, number, email, query
    })

    newQuery.save((err, data)=>{
        if(err){
            console.log(err)
        }
        res.send('OK')
    })
    console.log(newQuery)
})

//Authentication
const User = require('./models/Customer')

app.post('/SignUp', async (req, res)=>{
    try{
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        let newUser = await User.create({
            name: req.body.name,
            email: req. body.email,
            password: hashedPassword
        })
        res.json({ status: "OK"})
        console.log(newUser)
    }catch (err){
        res.json({ status: 'error', error: "Duplicate Email"})
    }
})

app.post('/SignIn', async (req, res)=>{
    console.log(req.body)
    const user = await User.findOne({
        email: req.body.email
    })

    if(!user){
        return { status: 'error'}
    }
    const validation = await bcrypt.compare(
        req.body.password,
        user.password
    )

    if(validation){
        const token = jwt.sign(
            {
                name: user.name,
                email: user.email,
            },
            'secret123'
        )
        console.log(token)
        return res.json({ status: 'OK', user: token})
    }else{
        return res.json({ status: 'error', user: false })
    }
})

app.listen(PORT, ()=>{console.log(`Server started on ${PORT}`)})