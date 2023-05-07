import { Inter } from 'next/font/google'
import React, {useState} from 'react'
import Axios from 'axios'
const inter = Inter({ subsets: ['latin'] })
import dynamic from 'next/dynamic';
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import 'react-quill/dist/quill.snow.css';



const modules = {
  toolbar: [
    [{ header: '1' }, { header: '2' }, { header: '3' }, { font: [] }],
    [{ size: [] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [
      { list: 'ordered' },
      { list: 'bullet' },
      { indent: '-1' },
      { indent: '+1' },
    ],
    ['link', 'image', 'video'],
    ['clean'],
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  },
}

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
        <input type="text" id="title" className='my-2 p-2 bg-slate-300 w-[100%]' onChange={(event)=>setTitle(event.target.value)}/>
        <br />
        <label htmlFor="note">Note</label>
        <br />
        <ReactQuill value={note} onChange={setNote} theme="snow"/>
        <br />
        <button className='my-2 p-2 bg-yellow-300 hover:bg-orange-600 hover:text-white' type='submit'>SUBMIT</button>
      </form>
    </div>
  )
}
