import React, {useState} from 'react'
import Axios from 'axios'
import {useNavigate} from 'react-router-dom'

const SignUp = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  
  const handleSubmit = async () => {
    const userObj = {
      name: name,
      email: email,
      password: password
    }
    try{
      const result =  await Axios.post(`http://localhost:4000/user/signUp`, userObj)
      if(result){
        alert('Registration Successful')
        navigate('/')
      }
    }
    catch(error){
      if(error.response.status === 400){
        alert('Sorry a user with this email already exist')
      }
      console.log(error)
    }
    
  }
  return (
    <>
      <div>
        <form>
        <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              aria-describedby="emailHelp"
              onChange={(e)=>setName(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              onChange={(e)=>setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              onChange={(e)=>setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary" onClick={handleSubmit}>
            Submit
          </button>
        </form>
      </div>
    </>
  )
}

export default SignUp