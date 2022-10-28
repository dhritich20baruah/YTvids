import React, { useState } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css';
import Axios from 'axios'

const Create = () => {
  const [title, setTitle] = useState('')
  const [snippet, setSnippet] = useState('')
  const [blogBody, setblogBody] = useState('')

  const handleSubmit=()=>{
    const blogObject = {
      title: title,
      snippet: snippet,
      blogBody: blogBody
    }
    Axios.post(`http://localhost:4000/newBlog/`, blogObject)
    .then(()=>{
      alert('Posted')
    })
  }


  return (
    <>
    <div className='container'>
      <form onSubmit={handleSubmit}>
      <div className="mb-3 ">
        <label for="exampleFormControlInput1" className="form-label">Title</label>
        <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Title" onChange={(event)=>setTitle(event.target.value)}/>
      </div>
      <div className="mb-3 ">
        <label for="exampleFormControlInput1" className="form-label">Snippet</label>
        <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Snippet" onChange={(event)=>setSnippet(event.target.value)}/>
      </div>
      <div className="mb-3">
        <label for="exampleFormControlTextarea1" className="form-label">Example textarea</label>
        <ReactQuill theme="snow" value={blogBody} onChange={setblogBody} />;
      </div>
      <button className="btn btn-warning" type='submit'>Submit</button>
      </form>
      </div>
    </>
  )
}

export default Create