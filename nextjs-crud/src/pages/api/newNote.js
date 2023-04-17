// import {MongoClient} from "mongodb"
const mongoose = require('mongoose')
import Notes from "../../../model/Notes"

async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).end()
    }

    try {
        const { title, note } = req.body

        if (!title || !note) {
            return res.status(400).json({ error: 'Note is required' })
        }
        //Connect to mongodb
        await mongoose.connect('mongodb://localhost/nextCRUD', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }).then(() => console.log('DB connected')).catch(err => console.log(err))

        const newNote = new Notes({
            title, note
        })
        await newNote.save()
        console.log(newNote)

        res.status(201).json({ message: 'Note created successfully', note: newNote });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Unable to create note' });
    } finally {
        mongoose.connection.close();
    }
}


export default handler