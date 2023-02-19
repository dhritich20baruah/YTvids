const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
const PORT = 5000;
const app = express();
const bcrypt = require('bcryptjs')
// const passport = require('passport')
const jwt = require('jsonwebtoken')

const JWT_SECRET = 'secret@123'

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

//Connect to mongoose
mongoose.connect('mongodb://localhost/marketing', {
    useNewUrlParser: true, useUnifiedTopology: true
}).then(() => console.log('DB Connected')).catch(err => console.log(err))

//Query
const Query = require('./models/Query');

app.post('/newQuery', (req, res) => {
    const name = req.body.name
    const number = req.body.number
    const email = req.body.email
    const query = req.body.query

    const newQuery = new Query({
        name, number, email, query
    })

    newQuery.save((err, data) => {
        if (err) {
            console.log(err)
        }
        res.send('OK')
    })
    console.log(newQuery)
})

//Authentication
const User = require('./models/Customer');
const checker = require("./config/checker");

app.post('/SignUp', async (req, res) => {
    try {
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ status: 'error', error: "Sorry a user with this email already exit" })
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
        // console.log(newUser, token)
        return res.json({ status: 'OK', token })
    } catch (err) {
        res.status(500).json({ status: 'error', error: "Internal Error" })
    }
})

app.post('/SignIn', async (req, res) => {
    const user = await User.findOne({
        email: req.body.email
    })

    if (!user) {
        return { status: 'error' }
    }
    const validation = await bcrypt.compare(
        req.body.password,
        user.password
    )

    if (validation) {
        const token = jwt.sign(
            {
                name: user.name,
                email: user.email,
                id: user.id
            },
            JWT_SECRET
        )
        return res.json({ status: 'OK', token, user })
    } else {
        return res.json({ status: 'error', user: false })
    }
})

app.post('/getuser', checker, async (req, res) =>{
    try {
      let userId= req.user;
      const user = await User.findOne(userId).select("-password");
      res.send(user)
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server error occured")
    }
    });

//Products routes
const Product = require('./models/Product')
// app.use('/products', require('./routes/productRoutes'))
app.post('/addProducts', async (req, res)=>{
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

app.get('/getAllProducts', async (req, res)=>{
    Product.find({}, function(err, data){
        if(err){
            console.log(err)
        }else{
            res.json(data)
        }
    })
}) 

app.get('/ProductDetails/:id', async (req, res)=>{
    const result = await Product.findOne({_id: req.params.id})
    res.json(result)
}) 

app.listen(PORT, () => { console.log(`Server started on ${PORT}`) })