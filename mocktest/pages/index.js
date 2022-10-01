import React, { useState, useRef} from 'react'
import {useRouter} from 'next/router'

export default function Home() {
  const [visible, setVisible] = useState(false)
  const router = useRouter()
  const ref = useRef(null)
  const handleClick = () => {
    if(ref.current.checked){
      router.replace('/Questions')
    }else{
      setVisible(visible => !visible)
    }
  }
 

  return (
    <>
      <div className='relative top-72'>
        <p className='p-5 text-lg'>
          <input type="checkbox" name="declaration" id="declaration" className='mx-4 text-xl' ref={ref}/> I have read the instructions and checked that the computer provided to me is working perfectly.
        </p>
        <div className='flex justify-center'>
          <button className='bg-indigo-700 text-lg text-white w-fit p-2 hover:bg-green-600 hover:cursor-pointer' onClick={handleClick}>START</button>
        </div>

        {visible && 
        <div className='bg-blue-300 text-center h-52 w-80 flex flex-col justify-center absolute top-[30%] left-[50%] translate-x-[-50%] translate-y-[-50%]'>
          <h1 className='text-2xl font-bold text-white'>WARNING!!</h1>
          <h1>Please check the checkbox to proceed.</h1>
          <button className='bg-orange-600 w-24 text-center mr-auto ml-auto p-2 hover:cursor-pointer hover:bg-red-600' onClick={handleClick}>OK</button>
        </div>
        }
      </div>
    </>
  )
}
