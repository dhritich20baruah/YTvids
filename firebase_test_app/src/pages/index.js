import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import { useState, useEffect } from "react";
import axios from "axios";
import { db } from "../../utils/firebaseConfig";
import { orderBy } from "firebase/firestore";
import { collection, query, getDocs } from "firebase/firestore";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  const [note, setNote] = useState("");
  const [notesArray, setNotesArray] = useState([]);
  const [editingNoteId, setEditingNoteId] = useState(null);
  const [editingNoteContent, setEditingNoteContent] = useState("");

  const fetchNotes = async () => {
    const notesCollection = collection(db, 'notes');
    const response = await query(notesCollection, orderBy('createdAt'));
    const data = await getDocs(response);
    setNotesArray(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  }

  useEffect(() => {
    fetchNotes();
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();

    const noteObj = {
      note: note
    }
    try {
      axios.post('/api/addNote', noteObj).then(() => {
        alert("Note added");
        setNote("");
        fetchNotes();
      });

    } catch (error) {
      console.error(error)
    }
  }

  const handleEditClick = (noteId, currentContent) => {
    setEditingNoteId(noteId);
    setEditingNoteContent(currentContent);
  }

  const cancelEditing = () => {
    setEditingNoteId(null);
    setEditingNoteContent("");
  }

  const handleUpdateNote = async (e) => {
    e.preventDefault();
    if (!editingNoteContent.trim()) {
      alert("note content cannot be empty");
      return;
    }

    if (editingNoteId) {
      try {
        await axios.put('/api/updateNote', {
          id: editingNoteId,
          note: editingNoteContent.trim()
        });
        setEditingNoteId(null);
        setEditingNoteContent("");
        alert("Note updated");
        fetchNotes();
      }
      catch (error) {
        console.error("Error updating note")
      }
    }
  }

  const deleteNote = async (noteId) => {
    try {
      await axios.delete(`/api/deleteNote?id=${noteId}`).then(() => { alert("Note deleted") })
      fetchNotes();
    } catch (error) {
      console.error("Error deleting note", error)
    }
  }

  return (
    <div
      className={`${geistSans.className} ${geistMono.className} grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]`}
    >
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <div>
          <input type="text" value={note} onChange={(e) => setNote(e.target.value)} className="md:w-full bg-white p-2 text-black rounded-md shadow shadow-black my-3" />
          <button className="p-2 rounded-md bg-orange-500 text-white hover:bg-red-700 cursor-pointer" onClick={handleSubmit}>ADD</button>
        </div>
        {/* Display fetched notes */}
        <div>
          {notesArray.map((item, index) => {
            return (
              <ul key={index} className="p-3 shadow shadow-black w-72">
                <li>
                  <p>{item.note}</p>
                  <p><button className="bg-red-700 text-white cursor-pointer px-3" onClick={() => deleteNote(item.id)}>Delete</button>
                    <button className="bg-blue-700 text-white cursor-pointer px-3 mx-2" onClick={() => handleEditClick(item.id, item.note)}>Edit</button>
                  </p>
                </li>
              </ul>
            )
          })}
        </div>
        <div>
          {editingNoteId &&
            <>
              <form onSubmit={handleUpdateNote} className="bg-white m-10">
                <input type="text" value={editingNoteContent} onChange={(e) => setEditingNoteContent(e.target.value)} className="md:w-full bg-white p-2 text-black rounded-md shadow shadow-black my-3" />
                <button className="p-2 rounded-md bg-green-500 text-white hover:bg-red-700 cursor-pointer" type="submit">Save</button>
                <button className="p-2 rounded-md bg-red-500 text-white hover:bg-red-700 cursor-pointer" onClick={cancelEditing}>Cancel</button>
              </form>
            </>}
        </div>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <p
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
        >
          Powered by Next.js and Firebase
        </p>

      </footer>
    </div>
  );
}
