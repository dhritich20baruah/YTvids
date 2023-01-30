import React, {useState} from 'react'
import Axios from 'axios'
import { useNavigate } from 'react-router-dom'

const SignUp = () => {
    const [name, setName] = useState('')
    const [number, setNumber] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    
    const handleSubmit = async () =>{
      const customerObj = {
        name: name,
        number: number,
        email: email,
        password: password
      }
      try{
        const result = await  Axios.post(`http://localhost:5000/SignUp`, customerObj)

        if(result){
            navigate('/userDashboard')
        }
      } catch(error){
        console.log(error)
      }
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
            <input type="text" placeholder='Enter your password' className='w-[100%] md:w-[50%] shadow-lg rounded-lg m-4 p-2 outline-none' onChange={(e)=>setPassword(e.target.value)} value={password} required/>
            <br />
            <button className='m-4 p-2 bg-yellow-500 rounded-lg text-white hover:bg-orange-600' onClick={handleSubmit}>Sign Up</button>
            </div>
        </>
      )
}

export default SignUp