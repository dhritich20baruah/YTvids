import { useState } from "react";
import Nav from "./components/Nav";
import Home from "./components/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Gyro from './components/Gyro'
import Heart from './components/Heart'
import Mp3 from './components/Mp3'
import Voice from './components/Voice'
import Order from "./components/Order";
import Foot from "./components/Foot";
import Query from "./components/Query";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import UserDashboard from "./components/UserDashboard";
import ProductDetails from "./components/ProductDetails";
import { productContext } from "./components/Context";
import AddProduct from "./components/AddProduct";

function App() {
  const [model, setModel] = useState([])
  return (
    <>
      <BrowserRouter>
      <productContext.Provider value={{ model, setModel }}>
        <Nav/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path='/Gyro' element={<Gyro/>}/>
          <Route path='/Heart' element={<Heart/>}/>
          <Route path='/Mp3' element={<Mp3/>}/>
          <Route path='/Voice' element={<Voice/>}/>
          <Route path='/Order' element={<Order/>}/>
          <Route path='/Query' element={<Query/>}/>
          <Route path='/Order' element={<Order/>}/>
          <Route path='/SignIn' element={<SignIn/>}/>
          <Route path='/SignUp' element={<SignUp/>}/>
          <Route path='/UserDashboard' element={<UserDashboard/>}/>
          <Route path='/ProductDetails/:id' element={<ProductDetails/>}/>
          <Route path='/AddProduct' element={<AddProduct/>}/>
        </Routes>
      <Foot/>
      </productContext.Provider>
      </BrowserRouter>
    </>
  );
}

export default App;
