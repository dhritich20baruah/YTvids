import React from 'react'
import product1 from "../images/product1.jpg";
import product2 from "../images/product2.jpg";
import product3 from "../images/product3.jpg";
import product4 from "../images/product4.jpg";
import product5 from "../images/product5.jpg";
import { Link } from 'react-router-dom';
import Buy from './Buy';

const Home = () => {
  return (
    <div className="Home">
      <section className="top flex flex-row bg-[#e5dfdc] text-gray-800">
        <div className="flex flex-col text-center justify-center p-20 w-[50vw]">
          <h1 className="text-2xl">Experience Our New Product</h1>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolorum
            necessitatibus consectetur et ad iste quod blanditiis voluptate
            beatae architecto exercitationem.
          </p>
        </div>
        <div className="w-[50vw]">
          <img src={product1} alt="" className="w-[100%]"/>
        </div>
      </section>

      <section className="about flex m-20 text-gray-700">
        <div className="w-[50vw]">
          <img src={product4} alt="" className='shadow-2xl'/>
        </div>
        <div className="w-[50vw] flex flex-col justify-center p-10">
          <h1 className="text-2xl">ABOUT THE PRODUCT</h1>
          <hr />
          <p className="mt-5">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vero
            quidem exercitationem enim libero dignissimos rerum iste eum
            accusantium sapiente voluptas maiores magni, cumque aliquid mollitia
            id labore dolore ratione soluta ut! Quasi, tempore debitis?
            Aspernatur tempore exercitationem reprehenderit. Laboriosam
            voluptates ipsa mollitia neque eveniet ex distinctio dolorem modi,
            at alias?
          </p>
        </div>
      </section>
      <section className="features text-white bg-gray-700 pb-10 text-center">
        <h1 className='mb-5 pt-5 text-3xl font-bold text-center'>Features</h1>
        <div className="flex flex-row justify-evenly">
          <Link to="/Gyro">
          <div className="basis-1/4 hover:bg-white hover:text-gray-800 p-4 rounded-md hover:cursor-pointer">
            <i className="material-icons">explore</i>
            <h1 className='text-xl mt-3 underline'>Gyro and Accelerometer</h1>
            <p>
                Track movement, activity levels, and even sleep patterns. Monitor your health and fitness levels.Also use it for navigation and location services.
            </p>
          </div>
          </Link>
          <Link to="/Heart">
          <div className="basis-1/4 hover:bg-white hover:text-gray-800 p-4 rounded-md hover:cursor-pointer">
            <i className="material-icons">favorite_border</i>
            <h1 className='text-xl mt-3 underline'>Heart Monitor</h1>
            <p>
              Monitor heart rate and track progress over time. Set goals for improving heart health. SOS feature that can be activated in case of emergency.
            </p>
          </div>
          </Link>
          <Link to="/Voice">
          <div className="basis-1/4 hover:bg-white hover:text-gray-800 p-4 rounded-md hover:cursor-pointer">
            <i className="material-icons">record_voice_over</i>
            <h1 className='text-xl mt-3 underline'>Voice Dial/Commands</h1>
            <p> 
                The voice command feature allows you to make calls, send messages, set reminders, play music, and even control your smart home devices, all with simple voice commands.
            </p>
          </div>
          </Link>
          <Link to="/Mp3">
          <div className="basis-1/4 hover:bg-white hover:text-gray-800 p-4 rounded-md hover:cursor-pointer">
            <i className="material-icons">music_video</i>
            <h1 className='text-xl mt-3 underline'>Mp3 Player</h1>
            <p> 
                The MP3 player feature allows you to store and play your
            own music files, giving you the freedom to listen to your music collection  without the need for a separate device.
            </p>
          </div>
          </Link>
        </div>
      </section>

      <section className='contact text-center justify-center m-10'>
        <h1 className='text-2xl text-gray-800'>If you want more information about the product click on the link below to fillup the contact form. Our sales team will contact you as soon as possible.</h1>
        <Link to="/SignUp">
        <button className='w-fit bg-yellow-400 m-5 text-white px-5 py-2 rounded-md font-bold hover:bg-orange-600'>CLICK HERE</button>
        </Link>
      </section>

      <h1 className='text-center text-3xl font-bold text-gray-700 my-5'>MODELS</h1>
      <section className='models flex m-5 space-x-4 text-center text-xl text-gray-800'>
        <div>
          <img src={product3} alt="" className='shadow-2xl'/>
          <h1>Model X1</h1>
          <h2>Price: 100 units</h2>
        </div>
        <div>
          <img src={product2} alt="" className='shadow-2xl'/>
          <h1>Model X2</h1>
          <h2>Price: 100 units</h2>
        </div>
        <div>
          <img src={product5} alt=""  className='shadow-2xl'/>
          <h1>Model X3</h1>
          <h2>Price: 100 units</h2>
        </div>
      </section>
      <hr />
      <Buy/>
    </div>
  )
}

export default Home