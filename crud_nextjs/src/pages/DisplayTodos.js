import React, {useState} from 'react'
import Axios from 'axios'
import dbConnect from '../../config/dbConnect'

export async function getStaticProps(){
    const mongoose = require('mongoose')
    const Todos = require('../../model/Todo')

    dbConnect()
    const todos = await Todos.find().sort({ createdAt: 'desc'})
    console.log(todos)
    return{
        props: {
            todos: JSON.parse(JSON.stringify(todos))
        }
    }
}

const DisplayTodos = ({todos}) => {
    const [visibility, setVisibility] = useState(false)
    const [title, setTitle] = useState('')
    const [todo, setTodo] = useState('')
    const [todoId, setTodoId] = useState('')

    const editForm = (title, todo, todoId) => {
        setVisibility(visibility => !visibility)
        setTitle(title)
        setTodo(todo)
        setTodoId(todoId)
    }

    const updateTodo = async (todoId) =>{
        const todoObj = {
            title: title,
            todo: todo
          }
          console.log(todoObj)
         await Axios.put(`/api/updateTodo?id=${todoId}`, todoObj)
          .then(()=>{
            window.location.reload(false)
          })
    }

    const deleteTodo = (todoId) =>{
        Axios.delete(`/api/deleteTodo?id=${todoId}`).then(()=>{
            window.location.reload(false)
        })
    }

    return (
        <>
            <div className='container'>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Title</th>
                            <th scope="col">Todo</th>
                            <th scope="col">Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        {todos.map((element)=>{
                           return(
                            <tr key={element._id}>
                            <td>{element.title}</td>
                            <td>{element.todo}</td>
                            <td>
                                <button className="btn btn-danger" onClick={()=>deleteTodo(element._id)}>Delete</button>
                                <button className="btn btn-primary" onClick={(title, todo, todoId)=>editForm(element.title, element.todo, element._id)}>Edit</button>
                            </td>
                        </tr>
                           ) 
                        })}                      
                    </tbody>
                </table>
            </div>

            {visibility && <div className='container'>
        <h1>Update Todo</h1>
        <form>
          <div className="mb-3">
            <label for="title" className="form-label">Title</label>
            <input type="text" className="form-control" id="title" aria-describedby="emailHelp" value={title} onChange={(event)=>setTitle(event.target.value)}/>          
          </div>
          <div className="mb-3">
            <label for="todo" className="form-label">Todo</label>
            <input type="text" className="form-control" id="todo" value={todo} aria-describedby="emailHelp" onChange={(event)=>setTodo(event.target.value)}/>          
          </div>
          <button type="submit" className="btn btn-primary" onClick={()=>updateTodo(todoId)}>Submit</button>
          <button className="btn btn-danger" onClick={()=>setVisibility(visibility => !visibility)}>Cancel</button>
        </form>
      </div>}
        </>
    )
}

export default DisplayTodos