import React from 'react'
import product3 from "../images/product3.jpg";
import products from './data';

const ProductDetails = () => {
  return (
    <>
    <div className='grid md:grid-cols-2 grid-cols-1 gap-10 justify-items-center m-5'>
        <div className='w-[90%] shadow-2xl'>
            <img src={product3} alt="" className='h-[40rem] mr-auto ml-auto'/>
            <div className='text-white font-bold mr-auto text-center'>
                <button className='bg-yellow-500 p-2 m-2'>ADD TO CART</button>
                <button className='bg-orange-600 p-2 m-2'>BUY NOW</button>
            </div>
        </div>
        <div className='space-y-2 w-[90%]'>
            <h1 className='text-gray-800 font-bold text-2xl'>iWatch Model X1 with Heart Monitor, Mp3 Player and Gyroscope</h1>
            <p className='font-bold text-red-700'>Price 100 Units</p>
            <h1 className='text-gray-800 font-bold text-lg'>Product Description</h1>
            <p className='font-semibold text-justify'>You can keep an eye on all the essential updates, notifications, and messages on your wrist with the help of the Fire-Boltt Cobra Smartwatch. Boasting an inbuilt dial pad, contact synchronisation, and call history features, this smartwatch makes it simple to make and receive calls. And, its inbuilt speaker and microphone ensure HD calling. Besides, thanks to its up to 4.521 cm (1.78) display and up to 368x448p high resolution, this smartwatch offers sharp, clear visuals. Moreover, the always-on display function in this smartwatch allows you to alternate between analogue and digital modes as necessary.</p>
            <h2 className='text-gray-800 font-bold text-lg'>Product Details </h2>
            <ul>
                <li>Closure - Buckle</li>
                <li>Sensor - Bluetooth Calling, Voice Assistance, Heart rate measurement (whole day heart rate), blood oxygen measurement and sleep monitoring, and upload app to save data synchronously Accelerometer, Barometer, Gyro Sensor, Light Sensor.</li>
                <li>Notification - Call, SMS, Whatsapp, Facebook, Twiter, Other Social Apps, Sedentary Reminder, Goal Completion</li>
                <li>Notification Type - Ring (Only in Bluetooth Calling Mode) and Vibration</li>
                <li>Battery Type - Lithium Ion</li>
                <li>Charge Time - 120 min</li>
                <li>Battery Life - Upto 5 Days</li>
                <li>Rechargeable Battery - Yes</li>
            </ul>    
            </div>
    </div>
    </>
  )
}

export default ProductDetails