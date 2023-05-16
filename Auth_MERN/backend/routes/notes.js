const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const checker = require('../config/checker')
const Note = require('../models/Note')

// CREATE 
router.post('/newNote', (req, res)=>{
    const title = req.body.title
    const note = req.body.note

    const newNote = new Note({
        title, note
    })
    newNote.save((err, data)=>{
        if(err){
            console.log(err)
        }
        res.send('OK')
    })
    console.log(newNote)
})
// READ
router.get('/getNotes', (req, res)=>{
    Note.find({}, function(err,data){
        if(err){
            console.log(err)
        }else{
            res.json(data)
        }
    })
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
