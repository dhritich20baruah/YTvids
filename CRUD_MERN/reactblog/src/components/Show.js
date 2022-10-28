import React, { useState, useEffect, useContext} from 'react'
import Axios from 'axios'
import { Link } from 'react-router-dom'
import parse from 'html-react-parser'
import { itemStateContext } from './Context'

const Show = () => {
  const [items, setItems] = useState([])
  const { post, setpost } = useContext(itemStateContext)

  useEffect(() => {
    Axios.get('http://localhost:4000/blogs')
    .then((res)=> setItems(res.data))
    .catch((err)=>console.log(err))
  }, [])
  
  const deletePost = (id) =>{
  Axios.delete(`http://localhost:4000/deletePost/${id}`).then(()=>{
    window.location.reload(false)
  })
  }
  return (
    <>
      <div className="container my-3">
        {items.map((element)=>{
          return(
            <div className="card my-3">
              <div className="card-body">
                <h2 className="card-title fs-bold">{element.title}</h2>
                <h5 className="card-text italics">"{element.snippet}"</h5>
                
                <Link to="/Post">
                  <p onClick={()=> setpost(element)}>Read more...</p>
                </Link>
                <button className="btn btn-danger" onClick={()=>deletePost(element._id)}>DELETE</button>   
                <Link to="/Edit">
                <button className="btn btn-primary" onClick={()=> setpost(element)}>EDIT</button>              
                </Link>            
              
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}

export default Show