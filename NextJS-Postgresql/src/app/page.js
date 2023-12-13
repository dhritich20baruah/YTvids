import { pool } from "@/utils/dbConnect"
import dbConnect from "@/utils/dbConnect"
import Link from "next/link"
import { redirect } from "next/navigation"


export default async function Home() {
  dbConnect()
  //CREATE
  async function createNote(data){
    "use server"
    let note = data.get("note")?.valueOf()
    let date = data.get("date")?.valueOf()
    try{
      const newNote = await pool.query('INSERT INTO notes (note, date) VALUES ($1, $2) RETURNING *', [note, date])
      console.log(newNote.rows[0])
    }
    catch(err){
      console.log(err)
    }
    redirect('/')
  }

  //READ
  const data = await pool.query("SELECT * FROM notes")
  const result = data.rows

  //DELETE
  async function deleteNote(data){
    "use server"
    let id = data.get("id").valueOf()

    try{
      await pool.query('DELETE FROM notes WHERE id = $1', [id])
      console.log(' note deleted')
    }
    catch(error){
      console.log(error)
    }
    redirect('/')
  }

  return (
   <main className="m-10">
    <div className="m-5">
      <h1 className="text-center m-5">
        Add note
      </h1>
      <form action={createNote} className="space-y-5">
        <input type="text"
        name='note'
        id='note' placeholder='Add note' className="shadow-lg rounded-md shadow-black h-10 p-3 w-[100%]" />
        <input type="date"
        name='date'
        id='date' placeholder='Add date' className="shadow-lg rounded-md shadow-black h-10 p-3 w-[100%]" />
        <button type="submit" className="bg-orange-500 font-bold text-white hover:bg-red-600 p-3 rounded-md">SUBMIT</button>
      </form>
    </div>

    {
      result.map((element)=>{
        return(
          <>
          <ul className="flex my-2">
            <li className="text-center w-[50%]">{element.note}</li>
            <li className="text-center w-[30%]">{element.date}</li>
            <li className=" flex text-center w-[20%]">
              <Link href={"/edit/"+element.id}>
              <button className="bg-cyan-600 font-bold text-white p-2">EDIT</button>
              </Link>
              <form action={deleteNote}>
              <input type="hidden" name="id" value={element.id}/>
              <button className="bg-red-600 font-bold text-white p-2" type="submit">DEL</button>
              </form>
            </li>
          </ul>
          </>
        )
      })
    }
   </main>
  )
}
