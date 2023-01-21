import React, { useState, useEffect } from 'react'

const ProductList = () =>{
    const [products, setProducts] = useState([])

    useEffect(()=>{
        getProducts()
    }, [])

    const getProducts = async () => {
        let result = await fetch('http://localhost:5000/products');
        result = await result.json()
        setProducts(result);
    }

    const deleteProduct = async (id) =>{
        let result = await fetch(`http://localhost:5000/product/${id}`,{
            method:'Delete'
        });
        result = await result.json()
        if(result)
        {
           getProducts()
        }

    }

    return (
        <div className="product-list">
            <h3>Product List</h3>
            <ul>
                <li>Sl. No.</li>
                <li>Name</li>
                <li>Price</li>
                <li>Category</li>
                <li>Operation</li>
            </ul>
            {
                products.map((item, index)=>
                <ul key={item._id}>
                <li>{index+1}</li>
                <li>{item.name}</li>
                <li>{item.price}</li>
                <li>{item.category}</li>
                <li><button onClick={()=>deleteProduct(item._id)}>Delete</button></li>
                </ul>
                )
            }
        </div>
    )
}

export default ProductList;