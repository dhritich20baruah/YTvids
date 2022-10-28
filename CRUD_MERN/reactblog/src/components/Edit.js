import React, {useContext, useState} from 'react'
import { itemStateContext } from './Context'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css';
import Axios from 'axios'

const Edit = () => {
  const { post } = useContext(itemStateContext)
  const [title, setTitle] = useState(post.title)
  const [snippet, setSnippet] = useState(post.snippet)
  const [blogBody, setblogBody] = useState(post.blogBody)

  const editSubmit=(id)=>{
    const blogObject = {
      title: title,
      snippet: snippet,
      blogBody: blogBody
    }
    Axios.put(`http://localhost:4000/update/${id}`, blogObject)
    .then(()=>{
      alert('Updated')
    })
  }

  return (
    <>
    <div className='container'>
      <form>
      <div className="mb-3 ">
        <label for="exampleFormControlInput1" className="form-label">Title</label>
        <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Title" value={title} onChange={(event)=>setTitle(event.target.value)}/>
      </div>
      <div className="mb-3 ">
        <label for="exampleFormControlInput1" className="form-label">Snippet</label>
        <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Snippet" value={snippet} onChange={(event)=>setSnippet(event.target.value)}/>
      </div>
      <div className="mb-3">
        <label for="exampleFormControlTextarea1" className="form-label">Example textarea</label>
        <ReactQuill theme="snow" value={blogBody} onChange={setblogBody} />;
      </div>
      <button className="btn btn-warning" type='submit' onClick={()=>editSubmit(post._id)}>Submit</button>
      </form>
      </div>
    </>
  )
}

export default Edit