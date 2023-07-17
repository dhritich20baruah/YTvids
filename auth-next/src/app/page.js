import Blog from "@/app/model/Blog"
import dbConnect from './utils/dbConnect'
import Link from "next/link"

export default async function Home() {
  dbConnect()
  let blogs = await Blog.find({})
  return (
   <main className="m-10">
    <h1 className="font-bold text-gray-800 text-2xl my-5 text-center">BLOGS</h1>
    {blogs.map((element)=>{
      return(
        <Link href={"/blogs/"+element._id}>
        <div className='w-[60%] hover:cursor-pointer hover:text-red-700 mx-auto my-auto' key={element._id}>
          <p className="text-center font-bold m-5">
            {element.title}
          </p>
          <p className="text-right italic">_________by Blogger One</p>
          <hr/>
        </div>
        </Link>
      )
    })}
   </main>
  )
}
