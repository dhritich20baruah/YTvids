const express = require('express')
const app = express()
const ejs = require('ejs')
const multer = require('multer')
const mongoose = require('mongoose')
const path = require('path')
const bodyParser = require('body-parser')
const PORT = 8050

//Connect to Mongo
mongoose.connect('mongodb://localhost/forms', {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => console.log('DB connected'))
.catch(err => console.log(err))

const Participant = require('./model/participant')

app.use('/static', express.static('static'))
app.use(bodyParser.urlencoded({extended: false}))
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
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
    })
})

app.listen(PORT, ()=> console.log(`Server started on ${PORT}`))