// import { GetStaticProps } from 'next';
import NotesList from './components/NotesList';

export async function getStaticProps() {
  // Connect to database and fetch notes
  const mongoose = require('mongoose');
  const Notes = require('../../model/Notes');

  await mongoose.connect('mongodb://localhost/nextCRUD', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log('DB connected')
   const notes = await Notes.find().sort({ createdAt: 'desc' });
  console.log(notes)


  return {
    props: { notes: JSON.parse(JSON.stringify(notes)) },
  };
};

const NotesPage = ({ notes }) => {
  return (
    <div>
      <h1>Notes</h1>
      <NotesList notes={notes} />
    </div>
  );
};

export default NotesPage;
