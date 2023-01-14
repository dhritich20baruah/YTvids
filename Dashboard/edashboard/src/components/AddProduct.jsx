import React, {useState} from "react";

const AddProduct = () => {
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [category, setCategory] = useState('')
    const [company, setCompany] = useState('')

    const addProduct = () =>{
        console.log(name, price, category, company)
    }

    return(
        <div className="product">
            <h1>Add Product</h1>
            <input className='inputBox' type='text' placeholder="Product Name" onChange={(e)=>{setName(e.target.value)}} value={name}/>
            <input className='inputBox' type='text' placeholder="Product Price" onChange={(e)=>{setPrice(e.target.value)}} value={price}/>
            <input className='inputBox' type='text' placeholder="Product Category" onChange={(e)=>{setCategory(e.target.value)}} value={category}/>
            <input className='inputBox' type='text' placeholder="Product Company" onChange={(e)=>{setCompany(e.target.value)}} value={company}/>
            <button className="appButton" onClick={addProduct}>Add Product</button>
        </div>
    )
}

export default AddProduct;