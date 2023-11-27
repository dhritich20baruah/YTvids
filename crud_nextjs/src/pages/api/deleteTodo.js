const mongoose = require('mongoose')
import Todo from '../../../model/Todo'
import dbConnect from '../../../config/dbConnect'

async function handler(req, res){
    if(req.method !== 'DELETE'){
        return res.status(405).end()
    }

    const { id } = req.query

   dbConnect()

    try{
        const deleteTodo = await Todo.deleteOne({_id:id})
        return res.status(200).end()
    }catch(error){
        console.log(error)
        res.status(500).json({error: "Not deleted"})
    }finally{
        mongoose.connection.close()
    }
}

export default handler