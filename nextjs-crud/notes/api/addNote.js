const mongoose = require('mongoose')
import Notes from '../../../model/Notes'

async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).end()
    }

    try {
        const { title, note } = req.body
        //Destructuring the req.body object sent from the front end and extracting the values of title and note and also creating two new variables of the same name.
        //Connect to mongodb
        await mongoose.connect('mongodb://localhost/nextCRUD', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }).then(() => console.log('Database connected')).catch(err => console.log(err))
        //usenewurlparser and useunifiedtopology are MongoDB driver's new connection management engine. and its new urlparser. We should set them both to true . 
        var newNote = new Notes({
            title, note
        })
        //newNote is the new instance of the note model created using mongoose with values of title and note.
        await newNote.save() //.save() is a mongoose command that creates a new record in the collection.
        console.log(newNote)
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: "internal error" })
    } finally {
        mongoose.connection.close()
    }
}

export default handler