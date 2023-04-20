import { useEffect, useState } from 'react';
import axios from 'axios';

export default function NotePage() {
  const [noteData, setNoteData] = useState([]);

  useEffect(() => {
    async function fetchNoteData() {
      const { data } = await axios.get(`/api/hello`);
     setNoteData(data)
    }
    fetchNoteData();
  }, []);

  return (
    <div>
        Edit note
        <p>{noteData.name}</p>
    </div>
  );
}

// export async function getServerSideProps(context) {
//   const { noteId } = context.params;
//   const { data } = await axios.get(`/api/singleNote/${noteId}`);
//   return {
//     props: {
//       note: data
//     }
//   };
// }
