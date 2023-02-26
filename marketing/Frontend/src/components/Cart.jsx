import React from 'react'
import CartItem from './CartItem'

const Cart = () => {
  return (
    <>
       <h1 className="text-center font-mono text-2xl m-5">CART</h1>
       <div className='flex'>
        <div className='w-[60%]'>
       <CartItem/>
        </div>
        <div className='w-[40%]'></div>
       </div>
    </>
  )
}

export default Cart