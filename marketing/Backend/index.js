const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
const PORT = 5000;
const app = express();
const bcrypt = require('bcryptjs')
const passport = require('passport')
const session = require('express-session')


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



app.listen(PORT, ()=>{console.log(`Server started on ${PORT}`)})