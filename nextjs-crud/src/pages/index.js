import { Inter } from 'next/font/google'
import React, {useState} from 'react'
import Axios from 'axios'
const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [title, setTitle] = useState('')
  const [note, setNote] = useState('')

  const handleSubmit = () => {
    const noteObj ={
      title: title,
      note: note
    }
    console.log(noteObj)
    Axios.post(`/api/newNote`, noteObj)
    .then(()=>{
      alert('Posted')
    })
  }

  
  return (
    <div className='w-[75vw] m-5'>
      <h1 className='text-xl font-bold my-2'>New Note</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title</label>
        <br />
        <input type="text" id="title" className='my-2 p-2 bg-slate-300 w-96' onChange={(event)=>setTitle(event.target.value)}/>
        <br />
        <label htmlFor="note">Note</label>
        <br />
        <textarea name="note" id="note" cols="30" rows="5" className='my-2 p-2 bg-slate-300 w-96' onChange={(event)=>setNote(event.target.value)}></textarea>
        <br />
        <button className='my-2 p-2 bg-yellow-300 hover:bg-orange-600 hover:text-white' type='submit'>SUBMIT</button>
      </form>
    </div>
  )
}
