const mongoose = require('mongoose')
import Notes from '../../../model/Notes'

async function handler(req, res) {
    if (req.method !== 'PUT') {
        return res.status(405).end()
    }

    const { id } = req.query;
    const { title, note } = req.body
    try {
        await mongoose.connect('mongodb://localhost/nextCRUD', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log(id)
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "DB not connected" }); // internal server error
        return;
    }

    try {
        const updatedNote = await Notes.findByIdAndUpdate(id, { title, note }, { new: true })
        console.log(updatedNote);
        res.status(200).json(updatedNote)
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Note not updated" })
    } finally {
        mongoose.connection.close
    }
}

export default handler