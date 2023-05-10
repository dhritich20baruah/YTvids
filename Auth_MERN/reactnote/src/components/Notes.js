import React, {useContext, useEffect, useState} from 'react'
import Axios from 'axios'
import parse from 'html-react-parser'
import { itemStateContext } from './Context'
import { Link } from 'react-router-dom'

const Notes = () => {
  const [items, setItems] = useState([])
  const {setPost} = useContext(itemStateContext)

  useEffect(()=>{
    Axios.get(`http://localhost:4000/notes`)
    .then((res)=>setItems(res.data))
    .catch((err)=>console.log(err))
  }, [])

  const deleteNote=(id)=>{
    Axios.delete(`http://localhost:4000/deleteNote/${id}`).then(()=>{
      window.location.reload(false)
    })
  }

  return (
    <>
      <div className="container">
        {items.map((element)=>{
          return(
          <div className="card my-3">
          <div className="card-body">
            <h2 className="card-title">{element.title}</h2>
            <p>{parse(element.note)}</p>
          <button className="btn btn-danger" onClick={()=>deleteNote(element._id)}>DELETE</button>
          <Link to="/Edit">
          <button className="btn btn-primary" onClick={()=>setPost(element)}>EDIT</button>
          </Link>
          </div>
        </div>
          )
        })}
      </div>
    </>
  )
}

export default Notes