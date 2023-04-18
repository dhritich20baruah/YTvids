import mongoose from 'mongoose';
import Notes from '../../../model/Notes';

async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).end();
  }

  try {
    await mongoose.connect('mongodb://localhost/nextCRUD', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('DB connected');

    const notes = await Notes.find().sort({ createdAt: 'desc' });

    res.status(200).json(notes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Unable to retrieve notes' });
  } finally {
    mongoose.connection.close();
  }
}

export default handler;
