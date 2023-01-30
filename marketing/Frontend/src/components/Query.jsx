import React, {useState} from 'react'
import Axios from 'axios'

const Query = () => {
const [name, setName] = useState('')
const [number, setNumber] = useState('')
const [email, setEmail] = useState('')
const [query, setQuery] = useState('')

const handleSubmit = () =>{
  const queryObj = {
    name: name,
    number: number,
    email: email,
    query: query
  }
  Axios.post(`http://localhost:5000/newQuery`, queryObj)
  .then(()=>{
    alert('Posted')
  })
  setName('')
  setNumber('')
  setEmail('')
  setQuery('')
}


  return (
    <>
        <div className="contact-form m-10 h-[70vh]">
        <input type="text" placeholder='Enter your name' className='w-[100%] md:w-[50%] shadow-lg rounded-lg m-4 p-2 outline-none' onChange={(e)=>setName(e.target.value)} value={name} required/>
        <br/>
        <input type="text" placeholder='Enter your number' className='w-[100%] md:w-[50%] shadow-lg rounded-lg m-4 p-2 outline-none' onChange={(e)=>setNumber(e.target.value)} value={number} required/>
        <br/>
        <input type="text" placeholder='Enter your email ID' className='w-[100%] md:w-[50%] shadow-lg rounded-lg m-4 p-2 outline-none' onChange={(e)=>setEmail(e.target.value)} value={email} required/>
        <br />
        <input type="text" placeholder='Any specific query?' className='w-[100%] md:w-[50%] shadow-lg rounded-lg m-4 p-2 outline-none' onChange={(e)=>setQuery(e.target.value)} value={query}/>
        <br />
        <button className='m-4 p-2 bg-yellow-500 rounded-lg text-white hover:bg-orange-600' onClick={handleSubmit}>SUBMIT</button>
        </div>
    </>
  )
}

export default Query