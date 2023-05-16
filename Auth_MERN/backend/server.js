const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
const PORT = 4000
const Note = require('./models/Note')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))

//Connect to mongodb
mongoose.connect('mongodb://0.0.0.0:27017/reactNote', {
    useNewUrlParser: true, useUnifiedTopology: true
}).then(()=> console.log('DB connected')).catch(err=> console.log(err))

//NOTES
const notes = require('./routes/notes')

app.use('/notes', notes)

//USER
const user = require('./routes/user')

app.use('/user', user)

app.listen(PORT, ()=>{console.log(`Server started at port ${PORT}`)} )