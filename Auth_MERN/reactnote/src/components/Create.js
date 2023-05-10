import React, {useState} from 'react';
import Axios from 'axios';
// import ReactQuill from 'react-quill';
// import 'react-quill/dist/quill.snow.css';

const Create = () => {
const [title, setTitle] = useState('')
const [note, setNote] = useState('')

const handleSubmit =()=>{
  const noteObj={
    title: title,
    note: note
  }
  Axios.post(`http://localhost:4000/newNote`, noteObj)
  .then(()=>{
    alert('Posted')
  })
}

  return (
    <>
      <div className="container my-4">
        <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label for="exampleFormControlInput1" className="form-label">Title</label>
          <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="title" onChange={(event)=>setTitle(event.target.value)}/>
        </div>
        <div className="mb-3">
          <label for="exampleFormControlTextarea1" className="form-label">Note</label>
          <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="title" onChange={(event)=>setNote(event.target.value)}/>

          {/* <ReactQuill theme="snow" value={note} onChange={setNote} /> */}
        </div>
        <button className="btn btn-warning" type="submit">SUBMIT</button>
        </form>
      </div>
    </>
  )
}

export default Create