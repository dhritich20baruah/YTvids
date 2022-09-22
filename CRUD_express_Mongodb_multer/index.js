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
const Participant = require('./models/participants')
const PORT = 8000

//Connect to Mongo
mongoose.connect('mongodb://localhost/crud',{
    useNewUrlParser: true, useUnifiedTopology: true
}).then(()=>console.log('Database Connected'))
.catch(err=>console.log(err))

app.set('views', path.join(__dirname, 'view'))
app.set('view engine', 'ejs')
app.use('/static', express.static('static'))

//According to geeks for geeks the express.urlencoded() function is a built-in middleware function in express. it parses incoming requests with the url-encoded payloads
app.use(express.urlencoded({ extended: true}))
app.use(express.json())

app.use(methodOverride('_method'))

//MULTER
const storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, './static');//The folder to which the file had to be saved
    },
    filename: (req, file, cb)=>{
        cb(null, file.originalname);//filename: name of the file within the destination. Originalname: name of the file on the user's computer
    }
})

const upload = multer({storage:storage})

app.get('/', (req, res) => {
    res.render('index')
})

app.post('/participate', upload.single('photo'), (req, res)=>{ //req means request that you send to the server or backend and res means response the server sends to you.
    const name = req.body.name
    const email = req.body.email
    const phone = req.body.phone
    const topic = req.body.topic
    //the req.body property contains key value pairs of data submitted in the request body or this case the data submitted in the form
    const photo = req.file.originalname //contains the file name
    const photopath = 'static/' + req.file.originalname
    //req.file is also a property like req.body but you need to use it to handle files.
    const newParticipant = new Participant({
        name, email, phone, topic, photo, photopath
    })
    newParticipant.save((err, data)=>{
        if(err){
            console.log(err)
        }
        res.redirect('/participants')
    })
    console.log(newParticipant)
})
app.get('/participants', (req, res)=>{
    Participant.find({}, function(err, data){
        //The find() function is used to find particular data from the MongoDB database.
        if(err){
            console.log(err)
        }else{
            res.render('participants', {data: data})
        }
    })
})

app.get('/deleteData/:id', (req, res)=>{
    Participant.deleteOne({_id:req.params.id}, function(err, data){
        if(err){
            console.log(err)
        }else{
            res.redirect('/participants')
        }
    })
})
//This will populate the edit page with data
app.get('/editData/:id', async (req, res)=>{
   const data = await Participant.findById(req.params.id)
    res.render('edit', {data: data})
})

app.put('/editData/:id', upload.single('photo'), async(req, res)=>{
    req.data = await Participant.findByIdAndUpdate(req.params.id)
    let data = req.data
    data.name = req.body.name
    data.email = req.body.email
    data.phone = req.body.phone
    data.topic = req.body.topic
    data.photo = req.file.photo
    data.photopath = 'static/' + req.file.originalname

    try{
        data = await data.save()
        res.redirect('/participants')
    }catch(err){
        res.render('edit', {data:data})
    }
})


app.listen(PORT, ()=> console.log(`Server started at port ${PORT}`))