const express = require('express')
const app = express(); //make it executable
const cors = require("cors");
const PORT = 5000;

const Jwt = require('jsonwebtoken');
const jwtKey = "e-com"

app.use(express.json());
app.use(cors());
//Importing the mongoose configuration from the config file 
require('./db/config')
const User = require("./db/User")
const Product = require('./db/Product')

app.post('/register', async (req, res)=>{
    let user = new User(req.body)
    let result = await user.save()
    result = result.toObject()
    delete result.password
    Jwt.sign({result}, jwtKey, {expiresIn: "1h"}, (err, token)=>{
        if(err){
            res.send({ result: "Invalid credentials"})
        }
        res.send({ result, auth: token})
    })
})

app.post('/login', async (req, res)=>{
    console.log(req.body)
    if(req.body.password && req.body.email){
        let user = await User.findOne(req.body).select("-password")
        if(user){
            Jwt.sign({user}, jwtKey, {expiresIn: "1h"}, (err, token)=>{
                if(err){
                    res.send({ result: "Invalid credentials"})
                }
                res.send({ user, auth: token})
            })
        }else{
            res.send({result: "No user found"})
        }
    }else{
        res.send({result: "No user found"})
    }
   
})

app.post("/add-product", verifyToken, async (req, res)=>{
    let product = new Product(req.body);
    let result = await product.save();
    res.send(result)
})

app.get('/products', verifyToken, async (req, res)=>{
    let products = await Product.find()
    if(products.length>0){
        res.send(products)
    }else{
        res.send({result:"No Products Found"})
    }
})

app.delete('/product/:id', verifyToken, async(req, res)=>{
    const result = await Product.deleteOne({_id:req.params.id})
    res.send(result)
})

app.get('/product/:id', verifyToken, async (req, res)=>{
    let result = await Product.findOne({_id:req.params.id})
    if(result){
        res.send(result)
    }else{
        res.send({result:"No record found"})
    }
})

app.put('/product/:id', verifyToken, async(req, res)=>{
    let result = await Product.updateOne( //This function accepts two parameters(objects) on the basis of which the update takes place
        {_id: req.params.id}, //Update on the basis of what
        {
            //The data to be updated is given in this object
            $set : req.body
        }
        )
        res.send(result)
})

app.get("/search/:key", verifyToken, async(req, res)=>{
    let result = await Product.find({
        "$or":[
            {name: {$regex: req.params.key}},
            {company: {$regex: req.params.key}},
            {category: {$regex: req.params.key}},
        ]
    });
    res.send(result)
})

function verifyToken(req, res, next){
    let token = req.headers['authorization']
    console.log("middleware called and", token)
    if(token){
        token = token.split(' ')[1]
        Jwt.verify(token, jwtKey, (err, valid)=>{
            if(err){
                res.status(401).send({result:"Please provide valid token"})
            }else{
                next()
            }
        })
    }else{
        res.status(403).send({result: "Please add token with header"})
    }
    // next()
}

app.listen(PORT, ()=>{console.log(`Server running at port ${PORT}`)})
