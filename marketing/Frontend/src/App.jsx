import { useState } from "react";
import Nav from "./components/Nav";
import Home from "./components/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Gyro from './components/Gyro'
import Heart from './components/Heart'
import Mp3 from './components/Mp3'
import Voice from './components/Voice'
import Order from "./components/Order";
import SignUp from "./components/SignUp";

function App() {
  return (
    <>
      <BrowserRouter>
        <Nav/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path='/Gyro' element={<Gyro/>}/>
          <Route path='/Heart' element={<Heart/>}/>
          <Route path='/Mp3' element={<Mp3/>}/>
          <Route path='/Voice' element={<Voice/>}/>
          <Route path='/Order' element={<Order/>}/>
          <Route path='/SignUp' element={<SignUp/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
