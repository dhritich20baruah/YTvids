import React, { useState } from 'react'
import Axios from 'axios'

export async function getStaticProps() {
    const mongoose = require('mongoose')
    const Notes = require('../../model/Notes')

    //Connect to mongodb
    await mongoose.connect('mongodb://localhost/nextJSCRUD', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    const notes = await Notes.find().sort({ createdAt: 'desc' })
    return {
        props: {
            notes: JSON.parse(JSON.stringify(notes))
        }
    }
}

//Delete function
const deleteNote = (id) => {
    Axios.delete(`/api/deleteNote?id=${id}`).then(() => {
        window.location.reload(false)
    })
}



const DisplayNotes = ({ notes }) => {
    const [visibility, setVisibility] = useState(false)
    const [title, setTitle] = useState('')
    const [note, setNote] = useState('')
    const [noteId, setNoteId] = useState('')

    //Edit function
    const editNote = (title, note, noteId) => {
        setVisibility(visibility => !visibility)
        setTitle(title)
        setNote(note)
        setNoteId(noteId)
    }

 const updateNote = async (noteId) => {
        const noteObj = {
            title: title,
            note: note
          }
          await Axios.put(`/api/updateNote?id=${noteId}`, noteObj).then(() => {
            window.location.reload(false)}) 
    }

    return (
        <>
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">Title</th>
                        <th scope="col">Note</th>
                        <th scope="col">Options</th>
                    </tr>
                </thead>
                <tbody>
                    {notes.map((element) => {
                        return (
                            <tr key={element._id}>
                                <td>{element.title}</td>
                                <td>{element.note}</td>
                                <td><button className="btn btn-danger" onClick={() => deleteNote(element._id)}>Delete</button>
                                    <button className="btn btn-primary" onClick={(title, note, noteId)=>editNote(element.title, element.note, element._id)}>Edit</button>
                                </td>
                            </tr>
                        )
                    })}

                </tbody>
            </table>

            {visibility && <div className='container'>
                <h2>Edit Note</h2>
                <form>
                    <div className="mb-3">
                        <label for="title" className="form-label">Title</label>
                        <input type="text" className="form-control" id="title" aria-describedby="emailHelp" value={title} onChange={(event) => setTitle(event.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label for="note" className="form-label">Note</label>
                        <input type="text" className="form-control" id="note" value={note} onChange={(event) => setNote(event.target.value)} />
                    </div>
                    <button type="submit" className="btn btn-primary" onClick={()=>updateNote(noteId)}>Submit</button>
                    <button className="btn btn-danger" onClick={()=>setVisibility(visibility !== visibility)}>Cancel</button>
                </form>
            </div>
            }
        </>
    )
}

export default DisplayNotes