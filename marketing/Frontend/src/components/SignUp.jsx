import React from 'react'

const SignUp = () => {
  return (
    <>
        <div className="contact-form m-10 h-[70vh]">
        <input type="text" placeholder='Enter your name' className='w-[100%] md:w-[50%] shadow-lg rounded-lg m-4 p-2 outline-none' required/>
        <br/>
        <input type="text" placeholder='Enter your number' className='w-[100%] md:w-[50%] shadow-lg rounded-lg m-4 p-2 outline-none' required/>
        <br/>
        <input type="text" placeholder='Enter your email ID' className='w-[100%] md:w-[50%] shadow-lg rounded-lg m-4 p-2 outline-none' required/>
        <br />
        <input type="text" placeholder='Any specific query?' className='w-[100%] md:w-[50%] shadow-lg rounded-lg m-4 p-2 outline-none'/>
        <br />
        <button className='m-4 p-2 bg-yellow-500 rounded-lg text-white hover:bg-orange-600'>SUBMIT</button>
        </div>
    </>
  )
}

export default SignUp