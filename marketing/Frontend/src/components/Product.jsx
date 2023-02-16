import Axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { productContext } from "./Context";

const Product = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    Axios.get(`http://localhost:5000/getAllProducts`)
      .then((res) => setItems(res.data))
      .catch((err) => console.log(err));
  });

  return (
    <>
      {items.map((item) => {
        return (
          <div
            className="hover:cursor-pointer w-[30%]"
            key={item._id}
          >
            <Link to={"/ProductDetails/"+item._id}>
            <img
              src={item.image}
              alt=""
              className="shadow-2xl w-[100%] h-96 object-cover"
            />
            <h1>{item.name}</h1>
            <h2>Price: {item.price}</h2>
            </Link>
          </div>
        );
      })}
    </>
  );
};

export default Product;
