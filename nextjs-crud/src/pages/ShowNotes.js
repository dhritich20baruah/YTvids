import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import { useRouter } from 'next/router'

const ShowNotes = () => {
    const [items, setItems] = useState([])
    const [visibility, setVisibility] = useState(false)
    const [title, setTitle] = useState("")
    const [note, setNote] = useState("")
    const [noteId, setNoteId] = useState("")
    const router = useRouter()
    
    useEffect(() => {
        Axios.get(`/api/showNote`)
        .then((res)=>setItems(res.data))
        .catch((err)=>console.log(err))
    }, [])

    const deleteNote = (id) =>{
        Axios.delete(`/api/deleteNote?id=${id}`).then(()=>{
            window.location.reload(false)
        })
    }

    // const singleNote = (id) =>{
    //     Axios.get(`/api/singleNote?id=${id}`).then(router.push(`/EditNote/${id}`))
    // }
   
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
    const editNote = (title, note, noteId)=>{
        setVisibility(visibility => !visibility)
        setTitle(title)
        setNote(note)
        setNoteId(noteId)
    }
    return (
        <>       
        <div className='relative'>
            <h1 className='text-center font-bold text-xl'>Notes</h1>
            <div className='flex justify-evenly m-3 font-bold'>
                <p>Title</p>
                <p>Details</p>
                <p>Action</p>    
            </div>      
            <hr />
            {items.map((element)=>{
                return(
                    <div key={element.id} className='flex justify-evenly'>
                    <h2 className='m-2 p-1'>{element.title}</h2>
                    <p className='m-2 p-1'>{element.note}</p>
                    <div>
                    <button className='bg-red-600 m-2 p-1 text-white hover:cursor-pointer' onClick={()=>deleteNote(element._id)}>Delete</button>
                    
                    <button className='bg-blue-600 m-2 p-1 text-white hover:cursor-pointer' onClick={()=>editNote(element.title, element.note, element._id)}>Edit</button>
                    </div>
                    </div>
                )
            })}
            
            {visibility && <div className='absolute w-[30%] h-auto p-5 bg-cyan-700 top-[50%] left-[50%] translate-x-[-50%] translate-y-[50%] font-bold'>
            <form>
                <label htmlFor="title">Title</label>
                <br />
                <input type="text" id="title" className='my-2 p-2 bg-slate-300 w-96' value={title} onChange={(event)=>setTitle(event.target.value)}/>
                <br />
                <label htmlFor="note">Note</label>
                <br />
                <textarea name="note" id="note" cols="30" rows="5" className='my-2 p-2 bg-slate-300 w-96' value={note} onChange={(event)=>setNote(event.target.value)}></textarea>
                <br />
                <button className='my-2 p-2 bg-yellow-300 hover:bg-orange-600 hover:text-white' type='submit' onClick={()=>updateNote(noteId)}>SUBMIT</button>
            </form>
        </div>}
        </div>
        </>
    )
}

export default ShowNotes