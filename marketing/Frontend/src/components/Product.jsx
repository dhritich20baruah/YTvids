import React, { useContext } from "react";
import { productContext } from "./Context";

const Product = (props) => {
  const { items } = props
  const {index, setIndex} = useContext(productContext)

  return (
    <>
      {items.map((item) => {
        return (
            <div className="hover:cursor-pointer" key={item.id} onClick={()=>setIndex(item.id - 1)}>
              <img src={item.image} alt="" className="shadow-2xl" />
              <h1>{item.name}</h1>
              <h2>Price: {item.price}</h2>
            </div>
        );
      })}
    </>
  );
};

export default Product;
