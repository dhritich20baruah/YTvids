// To build this application I am first going to initialize NPM
// Then I am going to install the following packages
// 1.express 2.ejs 3.mongoose 4.multer 5.method-override 6.nodemon 

const express = require('express')
const app = express()
const ejs = require('ejs')
const multer = require('multer')
const mongoose = require('mongoose')
const path = require('path')
const methodOverride = require('method-override')
const PORT = 8000

app.set('views', path.join(__dirname, 'view'))
app.set('view engine', 'ejs')
app.use('/static', express.static('static'))

app.get('/', (req, res) => {
    res.render('index')
})

app.get('/participants', (req, res)=>{
    res.render('participants')
})

app.get('/edit', (req, res)=>{
    res.render('edit')
})

app.listen(PORT, ()=> console.log(`Server started at port ${PORT}`))