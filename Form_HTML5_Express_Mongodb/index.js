const express = require('express')// Bringing in the express framework
const app = express()//Initializing the framework and declaring it to const called app
const ejs = require('ejs')
const multer = require('multer')
const mongoose = require('mongoose')
const path = require('path')
const methodOverride = require('method-override')
const PORT = 8050//declaring port 8050 as const PORT

var fs = require('fs')


//Connect to Mongo
mongoose.connect('mongodb://localhost/test', {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => console.log('DB connected'))
.catch(err => console.log(err))

const Participant = require('./model/participant')

//express.static(root, [options]). root->directory
//to create virtual path prefix '/static
app.use('/static', express.static('static'))

//According to geeks for geeks The express.urlencoded() function is a built-in middleware function in Express. It parses incoming requests with urlencoded payloads and is based on body-parser.
//By parsing it means to separate a string of commands – usually a program into more easily processed components, which are analyzed for correct syntax.Then the computer processes each program chunk and transform it into machine language.
app.use(express.urlencoded({ extended: true }));

// Parse incoming request bodies in a middleware before your handlers, available under the req.body property.
// URL encoding converts characters into a format that can be transmitted over the Internet.
// The extended: true precises that the req.body object will contain values of any type instead of just strings.
// app.use(bodyParser.urlencoded({extended: true}))

// The express.json() function is a built-in middleware function in Express. It parses incoming requests with JSON payloads and is based on body-parser.
app.use(express.json())
app.use(methodOverride('_method'))
//absolute path
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

//MULTER
const storage = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, './static');//The folder to which the file has been saved
    },
    filename: (req, file, cb)=>{
        cb(null, file.originalname);//filename: name of file within destination.Originalname name of the file on the user's computer
    }
})

const upload = multer({ storage: storage });

//app.method(path, handler)
app.get('/', (req, res)=>{
    res.render('index')
})

app.post('/participate', upload.single('photo'), (req, res) => {
    // const { name, email, phone, topic } = req.body;
    // The req.body property contains key-value pairs of data submitted in the request body. By default, it is undefined and is populated when you use a middleware called body-parsing such as express.urlencoded() or express.json().
    const name = req.body.name
    const email = req.body.email
    const phone = req.body.phone
    const topic = req.body.topic
    //Req.file is file upload library
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
            res.redirect('/participants')
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

app.listen(PORT, ()=> console.log(`Server started on ${PORT}`))//we use a built-in method called listen where we pass the port as argument and console.log as call back function.