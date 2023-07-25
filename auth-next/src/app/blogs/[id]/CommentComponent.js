"use client"
import React, {useState, useEffect} from 'react'
import { useSession, signIn, signOut } from 'next-auth/react'

const CommentComponent = (props) => {
    const [comment, setComment] = useState("")
    const [userName, setUserName] = useState("")
    const [userEmail, setUserEmail] = useState("")
    const [userPic, setUserPic] = useState("")

    const {blogsId} = props

    const {data:session} = useSession()

    const handleSubmit = async () => {
        await postComment(comment, userName, userEmail, userPic, blogsId)
        window.location.reload()
    }

    const logOut = () => {
        signOut()
    }

    useEffect(() => {
        const storedUserName = localStorage.getItem("userName")
        const storedUserPic = localStorage.getItem("userPic")
     if(session){
        setUserName(session.user.name)
        setUserEmail(session.user.email)
        setUserPic(session.user.image)
        localStorage.setItem("userName", session.user.name)
        localStorage.setItem("userPic", session.user.image)
     } else if (storedUserName){
        setUserName(storedUserName)
        setUserPic(storedUserPic)
     }
    }, [session])
    
  return (
    <div className='my-8'>
       {session ?
       (<div>
        <p className='font-semibold'>Hello {userName}, please leave your comment here.</p>
        <input type="text" name="comment" id="comment" className='w-[80%] outline-none border-b-2 border-slate-600 p-2'onChange={(e)=>setComment(e.target.value)}/>
        <button className="p-2 text-white bg-orange-600 ml-3 hover:cursor-pointer hover:bg-red-900">Submit</button>
        </div>)
        :
        (
        <div className='p-2'>You are not signed in. Please <span onClick={signIn} className='text-blue-800 underline hover:cursor-pointer'>sign in</span> to comment.</div>
        )
        }         
    </div>
  )
}

export default CommentComponent