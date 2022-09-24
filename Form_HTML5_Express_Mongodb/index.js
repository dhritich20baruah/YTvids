const express = require('express')
const app = express()
const ejs = require('ejs')
const multer = require('multer')
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const path = require('path')
const PORT = 8000

app.use(express.urlencoded({extended: true}))
app.use(express.json())

//Mongoose
const Participant = require('./model/Particapants')

mongoose.connect('mongodb://localhost/crud', {useNewUrlParser: true, useUnifiedTopology: true}).then(()=>console.log("Database Connected")).catch(err=>console.log(err))

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.use('/static', express.static('static'))

app.use(methodOverride('_method'))
//MULTER
const storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, "./static");//The folder to which the file had to be saved
    },
    filename: (req, file, cb)=>{
        cb(null, file.originalname);//filename: name of the file within the destination. Originalname: name of the file in the user's computer
    }
})

const upload = multer({storage: storage})

app.get('/', (req, res)=>{
    res.render('index')
})

app.post('/participate', upload.single('photo'), (req, res)=>{
    const name = req.body.name
    const email = req.body.email
    const phone = req.body.phone
    const topic = req.body.topic

    const photo = req.file.originalname
    const photopath = 'static/' + req.file.originalname

    const newParticipant = new Participant({
        name, email, phone, topic, photo, photopath
    })
    newParticipant.save((err, data)=>{
        if(err){
            console.log(err)
        }
        res.redirect('/')
    })
    console.log(newParticipant)

})

app.get('/participants', (req, res)=>{
    Participant.find({}, function(err, data){
        if(err){
            console.log(err)
        }else{
            res.render('participants', {data: data})
        }
    })

})

app.get('/deleteData/:id', (req, res)=>{
    Participant.deleteOne({_id: req.params.id}, function(err, data){
        if(err){console.log(err)}
        else{
            res.redirect('/participants')
        }
    })
})

app.get('/edit/:id', async (req, res)=>{
    const data = await Participant.findById(req.params.id)
    res.render('edit', {data: data})
})

app.put('/edit/:id', upload.single('photo'), async (req, res)=>{
    req.data = await Participant.findByIdAndUpdate(req.params.id)
    let data = req.data
    data.name = req.body.name
    data.email = req.body.email
    data.phone = req.body.phone
    data.topic = req.body.topic

    data.photo = req.file.originalname
    data.photopath = 'static/' + req.file.originalname

    try{
        data = await data.save()
        res.redirect('/participants')
    }catch(err){
        res.render('edit', {data: data})
    }

})

app.listen(PORT, ()=>console.log(`Server running on ${PORT}`))