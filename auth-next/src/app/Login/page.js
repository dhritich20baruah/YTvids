"use client"
import React from 'react'
import { useSession, signIn, signOut } from 'next-auth/react'
const page = () => {
    const {data: session} = useSession() //The useSession hook is used here to access the user's session data. It returns an object that contains the user's session information, including details like the user's name, email, and other relevant data. The data property of the returned object is destructured and renamed to session.

    //const session = useSession().data;
    //In this alternative version, we directly access the data property of the object returned by useSession(), without using object destructuring. The result is assigned to the session variable.
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
                <button className="p-2 bg-orange-400" onClick={signIn}>SignIn with Google/Github</button>
            </div>
        }
    </div>
  )
}

export default page