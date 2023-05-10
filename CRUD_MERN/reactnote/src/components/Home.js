import React, {useState} from 'react'
import SignIn from './SignIn'
import SignUp from './SignUp'

const Home = () => {
    const [visibility, setVisibility] = useState(false)
    const handleVisible = () => {
        setVisibility(visibility => !visibility)
    }
  return (
    <div className='container'>
        {visibility ? 
        <div>
        <SignUp/>
        <p>Already registered? <span onClick={handleVisible}>SignIn Here</span></p>
        </div>
        :
        <div>
        <SignIn/>
        <p>Not registered? <span onClick={handleVisible}>SignUp Here</span></p>
        </div>       
        }
    </div>
  )
}

export default Home