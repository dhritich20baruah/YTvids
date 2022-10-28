const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
const PORT = 4000
const Blog = require('./models/Blog')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))

//Connect to mongoose
mongoose.connect('mongodb://localhost/blogReact',{
    useNewUrlParser: true, useUnifiedTopology: true
}).then(()=>console.log('Database connected'))
.catch(err=>console.log(err))

//ENDPOINTS
app.post('/newBlog', (req, res)=>{
    const title = req.body.title 
    const snippet = req.body.snippet
    const blogBody = req.body.blogBody

    const newBlog = new Blog({
        title, snippet, blogBody
    })
    newBlog.save((err, data)=>{
        if(err){
            console.log(err)
        }
        res.send('Posted')
    })
    console.log(newBlog)
})

app.get('/blogs', (req, res)=>{
    Blog.find({}, function(err, data){
        if(err){
            console.log(err)
        }else{
            res.json(data)
        }
    })
})

app.delete('/deletePost/:id', (req, res)=>{
    Blog.deleteOne({_id: req.params.id}, function(err){
        if(err){
            console.log(err)
        }else{
            res.send('Deleted')
        }
    })
})

app.put('/update/:id', async (req, res)=>{
    req.data = await Blog.findByIdAndUpdate(req.params.id)
    let data = req.data
    data.title = req.body.title 
    data.snippet = req.body.snippet
    data.blogBody = req.body.blogBody

    try{
        data = await data.save()
        res.send('updated')
    }catch(err){
        console.log(err)
    }
})

app.listen(PORT, ()=>{console.log(`Server started at port ${PORT}`)})