import React from 'react'

const Order = () => {
  return (
    <>
      <div className="orderForm">
        <input type="text" placeholder='Enter your name' className='w-[100%] md:w-[50%] shadow-lg rounded-lg m-4 p-2 outline-none' required />
        <br />
        <input type="text" placeholder='Enter your number' className='w-[100%] md:w-[50%] shadow-lg rounded-lg m-4 p-2 outline-none' required />
        <br />
        <input type="text" placeholder='Enter your Email' className='w-[100%] md:w-[50%] shadow-lg rounded-lg m-4 p-2 outline-none' required/>
        <br />
        <p className='m-4 p-2 text-gray-600'>Select the model you are interested in. If you want you can select multiple models.</p>
        <label htmlFor="model" className='w-[100%] md:w-[50%] m-4 p-2 shadow-lg text-gray-600'>
          <input type="checkbox" name="model" id="x1" className='mx-2'/>Model X1
          <input type="checkbox" name="model" id="x2" className='mx-2'/>Model X2
          <input type="checkbox" name="model" id="x3" className='mx-2'/>Model X3
        </label>
        <br />
        <textarea name="address" id="address" cols="30" rows="5" className='w-[100%] md:w-[50%] shadow-lg rounded-lg m-4 p-2 outline-none' placeholder='Enter your address'></textarea>
        <br />
        <button className='m-4 p-2 bg-yellow-500 rounded-lg text-white hover:bg-orange-600'>Place Order</button>
      </div>
    </>
  )
}

export default Order