import { redirect } from "next/navigation";
import dbConnect from "../utils/dbConnect";
import Blog from "@/app/model/Blog"

export default async function CreateBlog(){
    async function newBlog(data){
        "use server"
        let title = data.get("title")?.valueOf();
        let image = data.get("image")?.valueOf();
        let body = data.get("body")?.valueOf();

        try{
            dbConnect()
            let newBlog = new Blog({title, image, body})
            await newBlog.save()
            console.log(newBlog)
        }catch(error){
            console.error(error)
        }
        redirect('/')
    }
    return(
        <main className="m-10">
            <h1 className="text-center m-5">New Blog</h1>
            <form action={newBlog}>
                <input type="text" name="title" id="title" className="m-2 p-2 w-[100%] shadow-lg shadow-black outline-none" placeholder="title"/>
                <br />
                <input type="text" name="image" id="image" className="m-2 p-2 w-[100%] shadow-lg shadow-black outline-none" placeholder="imageURL"/>
                <br />
                <textarea name="body" id="body" cols="30" rows="10" className="m-2 p-2 w-[100%] shadow-lg shadow-black outline-none" placeholder="Blog"></textarea>
                <br />
                <button className="p-2 m-2 bg-yellow-600 text-white hover:bg-orange-700">SUBMIT</button>
            </form>
        </main>
    )
}