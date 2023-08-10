import { useState, useEffect } from 'react'
import './App.css'
import Axios from 'axios'

function App() {
  const [note, setNote] = useState("")
  const [writtenBy, setWrittenBy] = useState("")
  const [items, setItems] = useState([])

  const handleSubmit = async() => {
    const noteObj = {
      note: note,
      writtenBy: writtenBy
    }
    console.log(noteObj)
    await Axios.post('http://localhost:5000/createNote', noteObj).then(()=>{alert('Note posted')})
  }

  useEffect(() => {
     Axios.get('http://localhost:5000/getNotes')
    .then((res)=>setItems(res.data))
    .catch((err)=>console.log(err))
  }, [])

  const deleteNote= (id) => {
    Axios.delete(`http://localhost:5000/deleteNote/${id}`)
    .then(()=>{
      window.location.reload()
    })
  }

  return (
    <>
    <div className="container m-5">
      <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="note" className="form-label">
          Note
        </label>
        <textarea
          className="form-control"
          id="note"
          rows="3"
          name="note"
          value={note}
          onChange={(e)=>setNote(e.target.value)}
        ></textarea>
      </div>
      <div className="mb-3">
        <label htmlFor="writtenBy" className="form-label">
          Written by
        </label>
        <input
          type="text"
          className="form-control"
          id="writtenBy"
          placeholder="Written by"
          name="writtenBy"
          value={writtenBy}
          onChange={(e)=>setWrittenBy(e.target.value)}
        />
      </div>
      <button className="btn btn-warning" type='submit'>SUBMIT</button>
      </form>
    </div>
    <div className="container m-5"> 
      <table class="table table-striped">
        <thead>
          <tr>
            <th scope="col">id</th>
            <th scope="col">Note</th>
            <th scope="col">Written by</th>
            <th scope="col">Written on</th>
            <th scope="col">Options</th>
          </tr>
        </thead>
        <tbody>
          {items.map((element)=>{
            return(
              <tr>
              <th scope="row">{element.id}</th>
              <td>{element.note}</td>
              <td>{element.written_by}</td>
              <td>{element.written_on}</td>
              <td>
                <button className="btn btn-danger" onClick={()=>deleteNote(element.id)}>DEL</button>
                <button className="btn btn-primary">EDIT</button>
              </td>
            </tr>
            )
          })}       
        </tbody>
      </table>
   
    </div>
    </>
  )
}

export default App
