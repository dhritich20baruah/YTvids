import React from 'react';
import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../utils/firebaseConfig';
import { useRouter } from 'next/router';

const SignIn = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
            alert("Login Successful");
            router.push('/Notes');
        } catch (error) {
            alert(error.message);
        }
    }
    return (
    <div className='p-5 max-w-md mx-auto mt-10'>
        <h2 className='text-2xl font-bold mb-4'>Login</h2>
        <form onSubmit={handleLogin} className='flex flex-col space-y-4'>
            <input type="email" name="email" id="email" placeholder='Email' className='border p-2' value={email} onChange={(e)=> setEmail(e.target.value)}/>
            <input type="password" name="password" id="password" placeholder='Password' className='border p-2' value={password} onChange={(e)=> setPassword(e.target.value)}/>
            <button type="submit" className='bg-green-600 text-white p-2 rounded cursor-pointer'>Login</button>
        </form>
    </div>
  )
}

export default SignIn