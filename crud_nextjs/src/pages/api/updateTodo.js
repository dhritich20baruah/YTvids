const mongoose = require('mongoose')
import Todos from '../../../model/Todo'
import dbConnect from '../../../config/dbConnect'

async function handler(req, res){
    if(req.method !== 'PUT'){
        return res.status(405).end()
    }

    const { id } = req.query
    const { title, todo } = req.body

   dbConnect()

    try{
        const updatedTodo = await Todos.findByIdAndUpdate(id, {title, todo})
        console.log(updatedTodo)
        res.status(500).json(updatedTodo)
    }catch(error){
        console.log(error)
        res.status(500).json({error: "Not updated"})
    }finally{
        mongoose.connection.close()
    }

}

export default handler