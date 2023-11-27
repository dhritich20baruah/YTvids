const mongoose = require('mongoose')
import Todo from '../../../model/Todo'
import dbConnect from '../../../config/dbConnect'

async function handler(req, res){
    if(req.method !== 'POST'){
        return res.status(405).end()
    }

    try{
        const { title, todo} = req.body
        dbConnect()
        var newTodo = new Todo({title, todo})
        await newTodo.save()
        console.log(newTodo)
        res.status(200).json({status:"Todo added"})
    }catch(error){
        console.log(error)
        res.status(500).json({error: "Internal error"})
    }
}

export default handler