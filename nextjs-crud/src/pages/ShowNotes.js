import React, { useState } from 'react'
import Axios from 'axios'
import parse from 'html-react-parser'

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


    return {
        props: { notes: JSON.parse(JSON.stringify(notes)) },
    };
};

const ShowNotes = ({ notes }) => {
    const [visibility, setVisibility] = useState(false)
    const [title, setTitle] = useState("")
    const [note, setNote] = useState("")
    const [noteId, setNoteId] = useState("")

    // useEffect(() => {
    //     Axios.get(`/api/showNote`)
    //         .then((res) => setItems(res.data))
    //         .catch((err) => console.log(err))
    // }, [])

    const deleteNote = (id) => {
        Axios.delete(`/api/deleteNote?id=${id}`).then(() => {
            window.location.reload(false)
        })
    }

    // const singleNote = (id) =>{
    //     Axios.get(`/api/singleNote?id=${id}`).then(router.push(`/EditNote/${id}`))
    // }

    const updateNote = async(noteId) => {
        const noteObj = {
            title: title,
            note: note
        }

        await Axios.put(`/api/editNote?id=${noteId}`, noteObj)
            .then(() => {
                alert('Updated')
            })
    }
    const editNote = (title, note, noteId) => {
        setVisibility(visibility => !visibility)
        setTitle(title)
        setNote(note)
        setNoteId(noteId)
    }
    return (
        <>
            <div className='relative'>
                <h1 className='text-center font-bold text-xl'>Notes</h1>

                    {notes.map((element) => {
                        return (
                            <div key={element.id} className='flex justify-evenly border-2 border-slate-500 m-5 p-3'>
                                <div className='m-2 p-1 w-[30%]'>{element.title}</div>
                                <div className='w-[70%]'>
                                <p className='m-2 p-1'>{parse(element.note)}</p>
                                    <button className='bg-red-600 m-2 p-1 text-white hover:cursor-pointer' onClick={() => deleteNote(element._id)}>Delete</button>

                                    <button className='bg-blue-600 m-2 p-1 text-white hover:cursor-pointer' onClick={() => editNote(element.title, element.note, element._id)}>Edit</button>
                                </div>
                            </div>
                        )
                    })}
             

                {visibility && <div className='absolute w-[30%] h-auto p-5 bg-cyan-700 top-[-50%] left-[50%] translate-x-[-50%] translate-y-[50%] font-bold z-20'>
                    <form>
                        <label htmlFor="title">Title</label>
                        <br />
                        <input type="text" id="title" className='my-2 p-2 bg-slate-300 w-96' value={title} onChange={(event) => setTitle(event.target.value)} />
                        <br />
                        <label htmlFor="note">Note</label>
                        <br />
                        <textarea name="note" id="note" cols="30" rows="5" className='my-2 p-2 bg-slate-300 w-96' value={note} onChange={(event) => setNote(event.target.value)}></textarea>
                        <br />
                        <button className='my-2 p-2 bg-yellow-300 hover:bg-orange-600 hover:text-white' type='submit' onClick={() => updateNote(noteId)}>SUBMIT</button>
                        <button className="my-2 p-2 bg-red-600 font-bold text-white hover:cursor-pointer" onClick={()=>setVisibility(false)}>Cancel</button>
                    </form>
                </div>}
            </div>
        </>
    )
}


export default ShowNotes