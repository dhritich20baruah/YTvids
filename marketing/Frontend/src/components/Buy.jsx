import React from 'react'
import { Link } from 'react-router-dom'

const Buy = () => {
  return (
    <section className='contact text-center justify-center m-10'>
        <Link to='/Order'>
        <button className='w-fit bg-yellow-400 m-5 text-white px-5 py-2 rounded-md font-bold hover:bg-orange-600'>ORDER NOW</button>
        </Link>
    </section>
  )
}

export default Buy