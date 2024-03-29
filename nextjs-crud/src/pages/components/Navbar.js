import React from 'react'
import Link from 'next/link'

const Navbar = () => {
  return (
    <>
        <div className='flex justify-evenly p-2 space-x-7 text-slate-800 bg-slate-300'>
            <div className='m-3 font-bold hover:cursor-pointer hover:text-red-900'>
              <Link href="/">Add Notes</Link>
            </div>
            <div className='m-3 font-bold hover:cursor-pointer hover:text-red-900'>
              <Link href="/ShowNotes">Show Notes</Link>
            </div>
        </div>
    </>
  )
}

export default Navbar