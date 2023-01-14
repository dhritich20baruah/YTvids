const express = require('express')
const app = express(); //make it executable
const cors = require("cors");
const PORT = 5000;

app.use(express.json());
app.use(cors());
//Importing the mongoose configuration from the config file 
require('./db/config')
const User = require("./db/User")

app.post('/register', async (req, res)=>{
    let user = new User(req.body)
    let result = await user.save()
    result = result.toObject()
    delete result.password
    res.send(req.body)
})

app.post('/login', async (req, res)=>{
    console.log(req.body)
    if(req.body.password && req.body.email){
        let user = await User.findOne(req.body).select("-password")
        if(user){
            res.send(user)
        }else{
            res.send({result: "No user found"})
        }
    }else{
        res.send({result: "No user found"})
    }
   
})

app.listen(PORT, ()=>{console.log(`Server running at port ${PORT}`)})
