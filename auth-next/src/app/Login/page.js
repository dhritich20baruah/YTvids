"use client"
import React from 'react'
import { useSession, signIn, signOut } from 'next-auth/react'
const page = () => {
    const {data: session} = useSession()
   return (
    <div>
        {
            session ?
            <div className='text-center m-16'>
            <p>Welcome, {session.user.name}</p>
            <button className="p-2 bg-orange-400" onClick={signOut}>SignOut</button>
            </div>
            :
            <div className='text-center m-16'>
                <p>You are not Signed In</p>
                <button className="p-2 bg-orange-400" onClick={signIn}>SignIn with Google</button>
            </div>
        }
    </div>
  )
}

export default page