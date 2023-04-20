import React, {useState, useEffect} from 'react'
import Axios from 'axios'

export default function EditNote ({id}) {
    const [note, setNote] = useState(null)

    useEffect(()=>{
        async function fetchNote(){
            try {
                const result = await Axios.get(`/api/singleNote/${id}`)
                if (result.data){
                    setNote(result.data)
                    console.log(result.data)
                } else {
                    console.error('Note not found')
                }
            } catch (error){
                console.error(error)
            }
        }

        fetchNote()
    }, [id])
    // const getNote = async() => {
    //     const result = await Axios.get(`/api/singleNote/`)
    //     console.log(result)
    // }

    // let info = result.data

    // setTitle(info.title)
    // setNote(info.note)
    return (
        <div className='w-[75vw] m-5'>
            <h1 className='text-xl font-bold my-2'>Edit Note</h1>
            {/* <div>
            <h1>{note.title}</h1>
            <p>{note.content}</p>
             </div> */}
            {/* <form onSubmit="">
                <label htmlFor="title">Title</label>
                <br />
                <input type="text" id="title" className='my-2 p-2 bg-slate-300 w-96' value={items}/>
                <br />
                <label htmlFor="note">Note</label>
                <br />
                <textarea name="note" id="note" cols="30" rows="5" className='my-2 p-2 bg-slate-300 w-96' value={items}></textarea>
                <br />
                <button className='my-2 p-2 bg-yellow-300 hover:bg-orange-600 hover:text-white' type='submit'>SUBMIT</button>
            </form> */}
        </div>
    )
}


export async function getServerSideProps(context) {
    const { noteId } = context.params;
    const { data } = await axios.get(`/api/singleNote/${noteId}`);
    return {
      props: {
        note: data
      }
    };
  }