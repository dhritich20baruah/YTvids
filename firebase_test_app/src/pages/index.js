import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import { useState } from "react";
import axios from "axios";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  const [note, setNote] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault();

    const noteObj = {
      note: note
    }

    try {
      const response = axios.post('/api/addNote', noteObj).then(()=>{alert("Note added")})
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <div
      className={`${geistSans.className} ${geistMono.className} grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]`}
    >
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
       <div>
        <input type="text" value={note} onChange={(e)=>setNote(e.target.value)} className="md:w-full bg-white p-2 text-black rounded-md shadow shadow-black my-3"/>
        <button className="p-2 rounded-md bg-orange-500 text-white hover:bg-red-700 cursor-pointer" onClick={handleSubmit}>ADD</button>
       </div>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <p
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
        >
          Powered by Next.js and Firebase
        </p>

      </footer>
    </div>
  );
}
