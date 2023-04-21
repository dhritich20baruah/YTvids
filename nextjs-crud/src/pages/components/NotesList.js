import Link from 'next/link';

const NotesList = ({ notes }) => {
  return (
    <ul>
      {notes.map(note => (
        <li key={note._id}>
          <Link href={`/notes/${note._id}`}>
            <p>{note.title}</p>
            <p>{note.note}</p>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default NotesList;
