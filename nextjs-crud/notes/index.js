import Head from 'next/head'
import Image from 'next/image'
import React, { useState } from 'react'
import { Inter } from 'next/font/google'
import Axios from 'axios'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [title, setTitle] = useState('')
  const [note, setNote] = useState('')

  const handleSubmit = () => {
    const noteObj = {
      title: title,
      note: note
    }
    console.log(noteObj)
    Axios.post('/api/addNote', noteObj)
    .then(()=>{
      alert('Note added')
    })
  }

  return (
    <>
      <div className='container'>
        <h2>Create Note</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label for="title" className="form-label">Title</label>
            <input type="text" className="form-control" id="title" aria-describedby="emailHelp" onChange={(event)=>setTitle(event.target.value)}/>
          </div>
          <div className="mb-3">
            <label for="note" className="form-label">Note</label>
            <input type="text" className="form-control" id="note" onChange={(event)=>setNote(event.target.value)}/>
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
    </>
  )
}
