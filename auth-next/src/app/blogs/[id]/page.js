import Blog from "@/app/model/Blog"
import dbConnect from "@/app/utils/dbConnect"
import Link from "next/link"

export default async function page({params}){
    dbConnect()
    const blogsId = params.id
    const blogs = await Blog.findOne({ _id:blogsId })

    return(
        <main className="m-10">
            <Link href="/"><p className="p-2 bg-slate-500 w-[10%] text-white">All Blogs</p></Link>
            <h1 className="font-bold text-gray-800 text-2xl my-5">{blogs.title}</h1>
            <img src={blogs.image} alt="blogImage" className="w-[90%] h-[50vh]" />
            <ul className="flex space-x-3 p-3">
                <li className="text-gray-600">16th July 2023</li>
                <li className="text-gray-600">Blogger One</li>
            </ul>
            <p className="text-gray-900 font-sans text-justify w-[90%]">{blogs.body}</p>
        </main>
    )
}