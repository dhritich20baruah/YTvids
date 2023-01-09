import React, {useState} from 'react'

const SignUp = () => {
   const [name, setName] = useState("")
   const [password, setPassword] = useState("") 
   const [email, setEmail] = useState("") 

   function collectData(){
        console.log(name, password, email)
   }

  return (
    <div className='register'>
        <h1>Register</h1>
          
        <input className='inputBox' type="text" placeholder='Enter Name' value={name} onChange={(e)=>setName(e.target.value)}/>
        <input className='inputBox' type="email" placeholder='Enter Email' value={email} onChange={(e)=>setEmail(e.target.value)}/>
        <input className='inputBox' type="password" placeholder='Enter Password' value={password} onChange={(e)=>setPassword(e.target.value)}/>
        <button className='appButton' onClick={collectData}>Sign Up</button>
       
    </div>
  )
}

export default SignUp