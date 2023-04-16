import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <div className='text-center w-[50vw]'>
      <h1 className='text-xl font-bold my-2'>New Note</h1>
      <form action="">
        <input type="text" placeholder='Enter title' className='my-2 p-2 bg-slate-300 w-96'/>
        <br />
        <textarea name="note" id="" cols="30" rows="10" placeholder='Enter note details' className='my-2 p-2 bg-slate-300 w-96'></textarea>
        <br />
        <button className='my-2 p-2 bg-yellow-300 hover:bg-orange-600 hover:text-white'>SUBMIT</button>
      </form>
    </div>
  )
}
