const mongoose = require('mongoose')
import Notes from "../../../../model/Notes"

async function handler(req, res){
    if(req.method !== 'DELETE'){
        return res.status(405).end()
    }

    try{
        await mongoose.connect('mongodb://localhost/nextCRUD', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
          })

        await Notes.deleteOne({_id: req.params.id})
    }catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Unable to delete note' });
    } finally {
        mongoose.connection.close();
    }
}

export default handler