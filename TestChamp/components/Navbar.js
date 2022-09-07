import React from 'react'
import Link from 'next/link'
import styles from '../styles/Home.module.css'
import Image from 'next/image'

const Navbar = () => {
  return (
    <nav className='flex justify-between bg-slate-100'>
        <div className=''>
        <Image src="/logo.png" alt="" width={60} height={60} />
        </div>
    <ul className='flex text-lg space-x-10 font-bold text-black m-3'>
      <Link href="/"><a><li>Home</li></a></Link>
      <Link href="/Test"><a><li>Test</li></a></Link>
      <Link href="/Blog"><a><li>Blog</li></a></Link>
      <Link href="/Notifications"><a><li>Notifications</li></a></Link>
    </ul>
  </nav>
  )
}

export default Navbar