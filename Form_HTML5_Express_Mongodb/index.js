const express = require('express')
const app = express()
const ejs = require('ejs')
const multer = require('multer')
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const path = require('path')
const PORT = 8000

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.use('/static', express.static('static'))

app.get('/', (req, res)=>{
    res.render('index')
})

app.listen(PORT, ()=>console.log(`Server running on ${PORT}`))