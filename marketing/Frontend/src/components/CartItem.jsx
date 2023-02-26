import React from 'react'

const CartItem = () => {
  return (
    <>
    <div className='card shadow-lg m-5 p-3 flex'>
        <div>
            <img src="https://i.postimg.cc/MHS3btTy/product4.jpg" alt="" />
        </div>
        <div className='m-5 space-y-4'>
            <h1 className='font-bold text-lg'>Title</h1>
            <div><span className='mr-2'>Quantity:</span> 
                <button className='bg-yellow-500 text-white font-bold w-10 h-10 rounded-md'>+</button>
                <input type="text" className='w-9' value=''/>
                <button className='bg-yellow-500 text-white font-bold w-10 h-10 rounded-md'>-</button>
            </div>
            <p>Price: <span className='text-lg text-red-800 ml-3'></span></p>
            <button className='bg-yellow-500 text-white font-bold p-1 rounded-md'>REMOVE</button>
        </div>
    </div>
    </>
  )
}

export default CartItem