import React, {useState} from 'react'
import Axios from 'axios'

const Home = () => {
    const [title, setTitle] = useState('')
    const [Note, setNote] = useState('')

    function handleSubmit(){
        const todoObj = {
            title: title,
            todo: Note
          }
          console.log(todoObj)
          Axios.post('/api/newTodo', todoObj)
          .then(()=>{
            alert('Todo added')
          })
    }

  return (
    <div>
        <form className='text-lg font-bold space-y-4'>
            <div className='m-5 space-x-3'>
                <label>Title</label>
                <input type="text" id="title" onChange={(e)=>setTitle(e.target.value)}/>
            </div>
            <div className='m-5 space-x-3'>
                <label>Note</label>
                <input type="text" id="title"onChange={(e)=>setNote(e.target.value)}/>
            </div>
            <button type='submit' onClick={handleSubmit} className='bg-orange-500 text-white p-3 m-5'>Submit</button>
        </form>
    </div>
  )
}

export default Home