// import { GetStaticProps } from 'next';
import NotesList from './components/NotesList';

export async function getStaticProps() {
  // Connect to database and fetch notes
  const mongoose = require('mongoose');
  const Notes = require('../../model/Notes');

  await mongoose.connect('mongodb://localhost/nextJSCRUD', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const notes = await Notes.find({});
  console.log(notes)
  const serializedNotes = notes.map(note => note.toObject());

  return {
    props: { notes: serializedNotes },
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
