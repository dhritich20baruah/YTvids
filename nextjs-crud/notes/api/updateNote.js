const mongoose = require('mongoose')
import Notes from '../../../model/Notes'

async function handler(req, res) {
    if (req.method !== 'PUT') {
        return res.status(405).end()
    }

    const { id } = req.query
    const { title, note } = req.body

    //Connect to mongodb
    try{
        await mongoose.connect('mongodb://localhost/nextJSCRUD', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
    }catch(error){
        console.log(error)
    }

    try {
        const updatedNote = await Notes.findByIdAndUpdate(id, {
            title, note
        }, {new: true})
        console.log(updatedNote)
        res.status(500).json(updatedNote)

    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "internal error" })
    } finally {
        mongoose.connection.close()
    }
}

export default handler