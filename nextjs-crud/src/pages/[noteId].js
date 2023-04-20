import { useEffect, useState } from 'react';
import axios from 'axios';

export default function NotePage({ note }) {
  const [noteData, setNoteData] = useState(note);

  useEffect(() => {
    async function fetchNoteData() {
      const { data } = await axios.get(`/api/singleNote/${noteData._id}`);
      setNoteData(data);
    }
    fetchNoteData();
  }, []);

  return (
    <div>
      <h1>{noteData.title}</h1>
      <p>{noteData.note}</p>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { noteId } = context.params;
  const { data } = await axios.get(`/api/singleNote/${noteId}`);
  return {
    props: {
      note: data
    }
  };
}
