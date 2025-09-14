"use client"
import React from 'react'
import { useUser } from '@clerk/nextjs'

const Contact = () => {
   const { isSignedIn, user, isLoaded } = useUser();

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  if (!isSignedIn) {
    return <div>Sign in to view this page</div>;
  }

  return (
    <div>
      <h1 className='text-center text-2xl'>Contact Us</h1>
      <p className='m-10'>You are logged in as: {user.firstName}</p>
    </div>
  )
}

export default Contact