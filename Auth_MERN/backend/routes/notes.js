const express = require('express')
const router = express.Router()
const fetcher = require('../config/fetcher')
const Note = require('../models/Note')

// CREATE 
router.post('/newNote', fetcher, async (req, res)=>{
    const title = req.body.title
    const note = req.body.note

    const newNote = new Note({
        title, note, user: req.user.id
    })
    await newNote.save((err, data)=>{
        if(err){
            console.log(err)
        }
        res.send('OK', data)
    })
    res.send(newNote)
    console.log(newNote)
    
})
// READ
router.get('/getNotes', fetcher, async (req, res)=>{
    try{
        const notes = await Note.find({user: req.user.id});
        res.json(notes)
    }
    catch(err){
        console.error(err.message)
        res.status(500).send("Internal server error")
    }
})
// DELETE
router.delete('/deleteNote/:id', (req, res)=>{
    Note.deleteOne({_id: req.params.id}, function(err){
        if(err){
            console.log(err)
        }else{
            res.send('deleted')
        }
    })
})
// UPDATE
router.put('/update/:id', async (req, res)=>{
    req.data = await Note.findByIdAndUpdate(req.params.id)
    let data = req.data
    if (data.user.toString() !== req.user.id){
        return res.status(401).send("Not allowed")
    }
    data.title = req.body.title
    data.note = req.body.note

   try{
    data = await data.save()
    res.send('updated')
   }catch(err){
    console.log(err)
   }
})

module.exports = router
