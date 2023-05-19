import React, {useState} from "react";
import Axios from 'axios'

const SignIn = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async () =>{
    try{
      const result = await Axios.post(`http://localhost:4000/user/signIn`, {
        email,
        password
      });
      const data = result.data
      console.log(data)
      if(data.token){
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.userInfo));
        alert("Sign In Successful")
        window.location.href = '/Notes'
      } else {
        alert("Please check email and password")
      }
    }
    catch(error){
      console.log(error)
    }
  } 
  return (
    <>
      <div>
        <form>
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
              value={email}
              required
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
              value={password}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary" onClick={handleSubmit}>
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default SignIn;
