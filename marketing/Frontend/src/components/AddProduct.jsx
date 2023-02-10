import React, { useState } from 'react'
import Axios from 'axios'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css';


const AddProduct = () => {
    const [name, setName] = useState('')
    const [image, setImage] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [details, setDetails] = useState('')

    const submitProduct = () =>{
        const productObj = {
            name: name, 
            image: image,
            description: description,
            details: details,
            price: price
        }
        console.log(productObj)
        Axios.post(`http://localhost:5000/addProducts`, productObj)
        .then(()=>{
            alert('Product Added')
        })

    }


  return (
    <>
    <div>
        <div className="productAdd m-10 h-[100%]">
        <input type="text" placeholder='Product Name' className='w-[100%] md:w-[50%] shadow-lg rounded-lg m-4 p-2 outline-none' onChange={(e)=>setName(e.target.value)} value={name}/>
        <br/>
        <input type="text" placeholder='Image URL' className='w-[100%] md:w-[50%] shadow-lg rounded-lg m-4 p-2 outline-none' onChange={(e)=>setImage(e.target.value)} value={image}/>
        <br/>
        <label htmlFor="description" className='m-4 p-2 font-bold'>Description</label>
        <ReactQuill theme='snow' className='w-[100%] md:w-[50%] shadow-lg rounded-lg m-4 p-2 outline-none' onChange={setDescription} value={description}/>
        <br />
        <label htmlFor="Details" className='m-4 p-2 font-bold'>Details</label>
        <ReactQuill theme='snow' className='w-[100%] md:w-[50%] shadow-lg rounded-lg m-4 p-2 outline-none' onChange={setDetails} value={details}/>
        <br />
        <input type="text" placeholder='Price' className='w-[100%] md:w-[50%] shadow-lg rounded-lg m-4 p-2 outline-none' onChange={(e)=>setPrice(e.target.value)} value={price}/>
        <br />
        <button className='m-4 p-2 bg-yellow-500 rounded-lg text-white hover:bg-orange-600' onClick={submitProduct}>SUBMIT</button>
        </div>
    </div>
    </>
  )
}

export default AddProduct