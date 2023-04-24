const mongoose = require('mongoose')
import Notes from '../../../model/Notes'

async function handler(req, res){
    if(req.method !== "DELETE"){
        return res.status(405).end
    }

    const {id} =req.query;
    try{
        await mongoose.connect('mongodb://localhost/nextJSCRUD', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })

        const result = await Notes.deleteOne({ _id: id})
        if (result.deletedCount === 1){
            return res.status(200).end()
        } else{
            return res.status(400).end()
        }
    }catch(err){
        console.log(err)
        return res.status(500).end()
    }
}

export default handler