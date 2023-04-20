import mongoose from 'mongoose';
import Notes from '../../../model/Notes';

async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).end();
  }

  const { id } = req.query;

  try {
    await mongoose.connect('mongodb://localhost/nextCRUD', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('DB connected');
    console.log(id)
    // const note = await Notes.findOne({ _id: id});
    // console.log(note)
    // res.status(200).json(note);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Unable to retrieve note' });
  } finally {
    mongoose.connection.close();
  }
}

export default handler;
