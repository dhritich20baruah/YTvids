import React, { useEffect, useContext } from "react";
import parse from 'html-react-parser'
import { productContext } from "./Context";
import Axios from 'axios'
import { useParams } from "react-router-dom";

const ProductDetails = () => {
  const {model, setModel} = useContext(productContext)

  // useEffect(async ()=>{
  //   const result = await Axios.get(`http://localhost:5000/ProductDetails/63e505046fd27dd963bcdbd0`)
  //   console.log(result)
  //   return
  // })

  return (
          <div className="grid md:grid-cols-2 grid-cols-1 gap-10 justify-items-center m-5">
            <div className="w-[90%] shadow-2xl">
              <img
                src={model.image}
                alt=""
                className="h-[40rem] mr-auto ml-auto"
              />
              <div className="text-white font-bold mr-auto text-center">
                <button className="bg-yellow-500 p-2 m-2">ADD TO CART</button>
                <button className="bg-orange-600 p-2 m-2">BUY NOW</button>
              </div>
            </div>
            <div className="space-y-2 w-[90%]">
              <h1 className="text-gray-800 font-bold text-2xl">
                {model.title}
              </h1>
              <p className="font-bold text-red-700">Price {model.price}</p>
              <h1 className="text-gray-800 font-bold text-lg">
                Product Description
              </h1>
              <div className="font-semibold text-justify">
                {parse(model.description)}
              </div>
              <h2 className="text-gray-800 font-bold text-lg">
                Product Details{" "}
              </h2>
             <div className="font-semibold text-justify">
              {parse(model.details)}
             </div>
            </div>
          </div>
  );
};

export default ProductDetails;
