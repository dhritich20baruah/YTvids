import { useState } from "react";
import "./App.css";
import product1 from "./images/product1.jpg";
import product2 from "./images/product2.jpg";
import product3 from "./images/product3.jpg";
import product4 from "./images/product4.jpg";
import product5 from "./images/product5.jpg";
import Nav from "./components/Nav";

function App() {
  return (
    <div className="App">
      <Nav />
      <section className="top flex flex-row bg-gray-700">
        <div className="flex flex-col text-center justify-center text-white p-20">
          <h1 className="text-2xl">Experience Our New Product</h1>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolorum
            necessitatibus consectetur et ad iste quod blanditiis voluptate
            beatae architecto exercitationem.
          </p>
        </div>
        <div className="w-full sm:w-1/2 lg:w-1/3">
          <img src={product1} alt="" className="w-full" />
        </div>
      </section>

      <section className="about flex m-20 text-gray-700">
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
        <div className="w-[50vw]">
          <img src={product4} alt="" />
        </div>
      </section>
      <section className="features text-white bg-black my-10 text-center">
        <h1>Features</h1>
        <div className="flex flex-row justify-evenly">
          <div className="basis-1/4">
            <i className="material-icons">explore</i>
            <h1>Gyro and Accelerometer</h1>
          </div>
          <div className="basis-1/4">
            <i className="material-icons">favorite_border</i>
            <h1>Heart Monitor</h1>
            <p>
              Allows users to easily monitor heart rate and track progress over
              time Allows users to set goals for improving heart health Has an
              SOS feature that can be activated in case of emergency
            </p>
          </div>
          <div className="basis-1/4">
            <i className="material-icons">record_voice_over</i>
            <h1>Voice Dial/Commands</h1>
          </div>
          <div className="basis-1/4">
            <i className="material-icons">music_video</i>
            <h1>Mp3 Player</h1>
          </div>
        </div>
      </section>
      <section>
        <div>
          <img src={product3} alt="" />
          <h1>Model X1</h1>
          <h2>Price: 100 units</h2>
        </div>
        <div>
          <img src={product2} alt="" />
          <h1>Model X2</h1>
          <h2>Price: 100 units</h2>
        </div>
        <div>
          <img src={product5} alt="" />
          <h1>Model X3</h1>
          <h2>Price: 100 units</h2>
        </div>
      </section>
      <section></section>
    </div>
  );
}

export default App;
