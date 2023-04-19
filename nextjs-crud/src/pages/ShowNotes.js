import React, { useState, useEffect } from 'react'
import Axios from 'axios'

const ShowNotes = () => {
    const [items, setItems] = useState([])
    
    useEffect(() => {
        Axios.get(`/api/showNote`)
        .then((res)=>setItems(res.data))
        .catch((err)=>console.log(err))
    }, [])

    const deleteNote = (id) =>{
        Axios.delete(`/api/deleteNote?id=${id}`).then(()=>{
            window.location.reload(false)
        })
    }
    return (
        <>       
        <div>
            <h1 className='text-center font-bold text-xl'>Notes</h1>
            <div className='flex justify-evenly m-3 font-bold'>
                <p>Title</p>
                <p>Details</p>
                <p>Action</p>    
            </div>      
            <hr />
            {items.map((element)=>{
                return(
                    <div key={element.id} className='flex justify-evenly'>
                    <h2 className='m-2 p-1'>{element.title}</h2>
                    <p className='m-2 p-1'>{element.note}</p>
                    <div>
                    <button className='bg-red-600 m-2 p-1 text-white hover:cursor-pointer' onClick={()=>deleteNote(element._id)}>Delete</button>
                    <button className='bg-blue-600 m-2 p-1 text-white hover:cursor-pointer'>Edit</button>
                    </div>
                    </div>
                )
            })}
        </div>
        </>
    )
}

export default ShowNotes