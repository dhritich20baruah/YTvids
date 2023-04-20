const mongoose = require('mongoose')
import Notes from '../../../model/Notes'

async function handler(req, res) {
    if (req.method !== 'PUT') {
        return res.status(405).end()
    }

    const { id } = req.query;
    try {
        await mongoose.connect('mongodb://localhost/nextCRUD', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log(id)
        const result = await Notes.findByIdAndUpdate({ _id: id })
        if (result.deletedCount === 1) {
            return res.status(200).end(); // success
        } else {
            return res.status(400).end(); // bad request
        }
    } catch (error) {
        console.error(error);
        return res.status(500).end(); // internal server error
    }
}

export default handler