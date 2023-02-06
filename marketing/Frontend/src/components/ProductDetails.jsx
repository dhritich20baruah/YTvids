import React, { useContext } from "react";
import productData from "./data";
import { productContext } from "./Context";

const ProductDetails = () => {
  const {index} = useContext(productContext)

  return (
          <div className="grid md:grid-cols-2 grid-cols-1 gap-10 justify-items-center m-5">
            <div className="w-[90%] shadow-2xl">
              <img
                src={productData[index].image}
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
                {productData[index].title}
              </h1>
              <p className="font-bold text-red-700">Price {productData[index].price}</p>
              <h1 className="text-gray-800 font-bold text-lg">
                Product Description
              </h1>
              <p className="font-semibold text-justify">
                {productData[index].description}
              </p>
              <h2 className="text-gray-800 font-bold text-lg">
                Product Details{" "}
              </h2>
             <p>
              {productData[index].details}
             </p>
            </div>
          </div>
  );
};

export default ProductDetails;
