const express = require('express')
const app = express()
const ejs = require('ejs')
const multer = require('multer')
const mongoose = require('mongoose')
const path = require('path')
const methodOverride = require('method-override')
const bodyParser = require('body-parser')
const PORT = 8050

var fs = require('fs')


//Connect to Mongo
mongoose.connect('mongodb://localhost/test', {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => console.log('DB connected'))
.catch(err => console.log(err))

const Participant = require('./model/participant')

app.use('/static', express.static('static'))
app.use(bodyParser.urlencoded({extended: false}))
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(methodOverride('_method'))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

//MULTER
const storage = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, './static');
    },
    filename: (req, file, cb)=>{
        cb(null, file.originalname);
    }
})

const upload = multer({ storage });

app.get('/', (req, res)=>{
    res.render('index')
})

app.post('/participate', upload.single('photo'), (req, res) => {
    const { name, email, phone, topic } = req.body;
    const photo = req.file.originalname;
    const photopath = 'static/' + req.file.originalname;
    const newParticipant = new Participant({
        name,
        email,
        phone,
        topic,
        photo,
        photopath
    });
    newParticipant.save((err, data) => {
        if(err){
            console.log(err)
        }
        res.redirect('/participants')
    })
    console.log(Participant)
})

app.get('/participants', (req, res)=>{
    Participant.find({}, function(err, data){
        if(err){
            console.log(err);
        }else{
            res.render('participants', {data: data})
        }
    }).sort({createdAt: 'desc'})
})

app.get('/deleteData/:id', (req, res)=>{  
    Participant.deleteOne({_id: req.params.id}, function(err, data){
        if(err){
            console.log(err)
        }else{
            res.redirect('/participants');
        }   
    })
})

app.get('/editData/:id', async (req, res) => {
    const data = await Participant.findById(req.params.id)
    res.render('edit', { data: data })
})

app.put('/editData/:id',upload.single('photo'), async (req, res, next) => {
    req.data = await Participant.findByIdAndUpdate(req.params.id)
    let data = req.data
        data.name = req.body.name
        data.email = req.body.email
        data.phone = req.body.phone
        data.topic = req.body.topic
        data.photo = req.file.photo
        data.photopath = 'static/' + req.file.originalname;    
        console.log(data)    
        try {
            data = await data.save()
            res.redirect('/participants')
        } catch (e) {
            res.render('edit', { data: data })
        }
  })

  
function saveArticleAndRedirect() {
    return async (req, res) => {
        let data = req.data
        data.name = req.body.name
        data.email = req.body.email
        data.phone = req.body.phone
        data.topic = req.body.topic
        data.photo = req.file.photo
        data.photopath = 'static/' + req.file.originalname;    
        console.log(data)    
        try {
            data = await data.save()
            res.redirect('/participants')
        } catch (e) {
            res.render('edit', { data: data })
        }
    }
}

app.listen(PORT, ()=> console.log(`Server started on ${PORT}`))