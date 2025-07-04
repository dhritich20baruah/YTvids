import React from 'react'
import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../utils/firebaseConfig';

const SignUp = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSignUp = async (e) => {
        e.preventDefault()
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            alert("Sign Up Successful");
            window.location.reload();
        } catch (error) {
            console.error(error);
            alert(error.message);
        }
    }
    return (
        <div className='p-5 max-w-md mx-auto mt-10'>
            <h2 className='text-2xl font-bold mb-4'>Sign Up</h2>
            <form onSubmit={handleSignUp} className='flex flex-col space-y-4'>
                <input type="email" name="email" id="email" placeholder='Email' className='border p-2' value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="password" name="password" id="password" placeholder='Password' className='border p-2' value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type="submit" className='bg-red-600 text-white p-2 rounded cursor-pointer'>Sign Up</button>
            </form>
        </div>
    )
}

export default SignUp