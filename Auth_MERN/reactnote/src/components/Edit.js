import React, { useContext, useState } from 'react'
import { itemStateContext } from './Context'
import Axios from 'axios'

const Edit = () => {
  const {post} = useContext(itemStateContext)
  const [title, setTitle] = useState(post.title)
  const [note, setNote] = useState(post.note)

  const updateSubmit =(id)=>{
    const noteObj={
      title: title,
      note: note
    }
    Axios.put(`http://localhost:4000/notes/update/${id}`, noteObj, {
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      }
    })
    .then(()=>{
      alert('Posted')
    })
    .catch(error => {
      console.error(error);
      alert('An error occurred while posting the note. Please try again.');
    });
  }

  return (
    <>
      <div className="container">
      <form>
        <div className="mb-3">
          <label for="exampleFormControlInput1" className="form-label">Title</label>
          <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="title" value={title} onChange={(event)=>setTitle(event.target.value)}/>
        </div>
        <div className="mb-3">
          <label for="exampleFormControlTextarea1" className="form-label">Note</label>
          <textarea
              class="form-control"
              id="exampleFormControlTextarea1"
              rows="3"
              placeholder="title"
              value={note} onChange={(event)=>setNote(event.target.value)}
            ></textarea>
        </div>
        <button className="btn btn-warning" onClick={()=>updateSubmit(post._id)}>SUBMIT</button>
        </form>
      </div>
    </>
  )
}

export default Edit