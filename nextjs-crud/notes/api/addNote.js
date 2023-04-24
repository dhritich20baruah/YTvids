const mongoose = require('mongoose')
import Notes from '../../../model/Notes'

async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).end()
    }

    try {
        const { title, note } = req.body

        //Connect to mongodb
        await mongoose.connect('mongodb://localhost/nextJSCRUD', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }).then(() => console.log('Database connected')).catch(err => console.log(err))

        var newNote = new Notes({
            title, note
        })
        await newNote.save()
        console.log(newNote)
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: "internal error" })
    } finally {
        mongoose.connection.close()
    }
}

export default handler