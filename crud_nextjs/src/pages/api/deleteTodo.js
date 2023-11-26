const mongoose = require('mongoose')
import Todo from '../../../model/Todo'

async function handler(req, res){
    if(req.method !== 'DELETE'){
        return res.status(405).end()
    }

    const { id } = req.query

    try{
        await mongoose.connect('mongodb://127.0.0.1:27017/nextJSCRUD',{
            useNewUrlParser: true,
            useUnifiedTopology: true
        }).then(()=> console.log(' DB connected'))
    }catch(error){
        console.log(error)
    }

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