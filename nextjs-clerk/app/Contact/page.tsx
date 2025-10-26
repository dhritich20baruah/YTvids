"use client"
import React from 'react'
import { useUser } from '@clerk/nextjs';

const Contact = () => {
  const { isSignedIn, user, isLoaded } = useUser();

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  if (!isSignedIn) {
    return <div>Sign in to view this page</div>;
  }

  return (
     <div className='m-10'>
      <h1 className='text-5xl font-bold text-center'>Contact</h1>
      <p className="text-center text-xl font-semibold">Hello {user.firstName}!</p>
    </div>
  )
}

export default Contact