const express = require('express')
const app = express(); //make it executable
const cors = require("cors")
const PORT = 5000;

app.use(express.json())
app.use(cors())
//Importing the mongoose configuration from the config file 
require('./db/config')
const User = require("./db/User")

app.post('/register', async (req, res)=>{
    let user = new User(req.body)
    let result = await user.save()
    res.send(req.body)
})

app.listen(PORT, ()=>{console.log(`Server running at port ${PORT}`)})
