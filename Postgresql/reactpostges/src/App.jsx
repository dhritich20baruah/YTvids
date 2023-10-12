import { useState, useEffect } from 'react'
import { useRecoilState } from 'recoil'
import './App.css'
import Axios from 'axios'
import { todoListAtom } from './recoil/atom/todoAtom'
import { TodoMain } from './components/TodoMain'

function App() {
  const [note, setNote] = useState("")
  const [writtenBy, setWrittenBy] = useState("")
  const [_, setTodoList] = useRecoilState(todoListAtom)
  // const [noteId, setNoteId] = useState('')
  // const [items, setItems] = useState([])
  const [visibility, setVisibility] = useState(true)

  const createNote = () => {
    if(note){
    setTodoList((oldTodoList)=>[
      ...oldTodoList,
      {
        id: Date.now() + "_id_" + Math.floor(Math.random()*1000),
        text: note,
        // writtenBy: writtenBy
        isComplete: false
      }
    ]);
    setNote("")
  }
    
    // await Axios.post('http://localhost:5000/createNote', noteObj).then(()=>{alert('Note posted')})
  }

  // useEffect(() => {
  //    Axios.get('http://localhost:5000/getNotes')
  //   .then((res)=>setItems(res.data))
  //   .catch((err)=>console.log(err))
  // }, [])

  // const deleteNote= (id) => {
  //   Axios.delete(`http://localhost:5000/deleteNote/${id}`)
  //   .then(()=>{
  //     window.location.reload()
  //   })
  // }

  // const editNote = (id, note, writtenBy) => {
  //   setNoteId(id)
  //   setNote(note);
  //   setWrittenBy(writtenBy);
  //   setVisibility(visibility => !visibility)
  // }

  // const updateNote = (noteId) => {
  //   const noteObj = {
  //     note: note,
  //     writtenBy: writtenBy
  //   }
  //   console.log(noteId)
  //   Axios.put(`http://localhost:5000/updateNote/${noteId}`, noteObj)
  //   .then(()=>{
  //     alert('Note updated')
  //   })
  // }

  return (
    <>
    <div className="container m-5">
      <form>
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
      {visibility ? 
      <button className="btn btn-warning" onClick={createNote}>SUBMIT</button>
      :
      <button className="btn btn-primary" onClick={()=>updateNote(noteId)}>UPDATE</button>
      }
      </form>
    </div>
    {/* <div className="container m-5"> 
      <table className="table table-striped">
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
          {todoList.map((element)=>{
            return(
              <tr key={element.id}>
              <th scope="row">{element.id}</th>
              <td>{element.note}</td>
              <td>{element.written_by}</td>
              <td>{element.written_on}</td>
              <td>
                <button className="btn btn-danger" onClick={()=>deleteNote(element.id)}>DEL</button>
                <button className="btn btn-primary" onClick={()=>editNote(element.id, element.note, element.written_by)}>EDIT</button>
              </td>
            </tr>
            )
          })}       
        </tbody>
      </table>
   
    </div> */}
    <TodoMain/>
    </>
  )
}

export default App
