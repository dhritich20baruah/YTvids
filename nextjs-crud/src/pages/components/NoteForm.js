import React, {useState} from 'react'
import Axios from 'axios'

const NoteForm = (props) => {
    const {noteTitle, noteDesc, noteId} = props
    const [title, setTitle] = useState('')
    const [note, setNote] = useState('')

    const updateNote = (noteId) =>{
        const noteObj = {
            title: title,
            note: note
        }

        Axios.put(`/api/editNote?id=${noteId}`, noteObj)
        .then(()=>{
            alert('Updated')
        })
    }

    return (
        <>
        <div className='absolute w-[30%] h-auto p-5 bg-cyan-700 top-[50%] left-[50%] translate-x-[-50%] translate-y-[50%] font-bold'>
            <form>
                <label htmlFor="title">Title</label>
                <br />
                <input type="text" id="title" className='my-2 p-2 bg-slate-300 w-96' value={noteTitle} onChange={(event)=>setTitle(event.target.value)}/>
                <br />
                <label htmlFor="note">Note</label>
                <br />
                <textarea name="note" id="note" cols="30" rows="5" className='my-2 p-2 bg-slate-300 w-96' value={noteDesc} onChange={(event)=>setNote(event.target.value)}></textarea>
                <br />
                <button className='my-2 p-2 bg-yellow-300 hover:bg-orange-600 hover:text-white' type='submit' onClick={()=>updateNote(noteId)}>SUBMIT</button>
            </form>
        </div>
        </>
    )
}

export default NoteForm