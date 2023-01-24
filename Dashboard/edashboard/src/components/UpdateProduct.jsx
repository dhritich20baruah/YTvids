import React, {useState, useEffect} from "react";
import {useParams, useNavigate} from 'react-router-dom'

const UpdateProduct = () => {
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [category, setCategory] = useState('')
    const [company, setCompany] = useState('')
    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        console.log(params)
        getProductDetails();
    }, [])

    const getProductDetails = async ()=>{
        let result = await fetch(`http://localhost:5000/product/${params.id}`,{
            headers:{
                authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result = await result.json()
        setName(result.name)
        setPrice(result.price)
        setCategory(result.category)
        setCompany(result.company)
    }

    const updateProduct = async () =>{
        let result = await fetch(`http://localhost:5000/product/${params.id}`, {
            method: 'put',
            body: JSON.stringify({ name, price, category, company }),
            headers: {
                'Content-Type': 'application/json',
                authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        })
        result = await result.json()
        navigate('/')
    }

    return(
        <div className="product">
            <h1>Update Product</h1>
            <input className='inputBox' type='text' placeholder="Product Name" onChange={(e)=>{setName(e.target.value)}} value={name}/>
            <input className='inputBox' type='text' placeholder="Product Price" onChange={(e)=>{setPrice(e.target.value)}} value={price}/>

            <input className='inputBox' type='text' placeholder="Product Category" onChange={(e)=>{setCategory(e.target.value)}} value={category}/>

            <input className='inputBox' type='text' placeholder="Product Company" onChange={(e)=>{setCompany(e.target.value)}} value={company}/>

            <button className="appButton" onClick={updateProduct}>Update Product</button>
        </div>
    )
}

export default UpdateProduct