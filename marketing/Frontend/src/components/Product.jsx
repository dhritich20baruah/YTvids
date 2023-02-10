import Axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { productContext } from "./Context";

const Product = () => {
  const [items, setItems] = useState([]);
  const { model, setModel } = useContext(productContext);
  const navigate = useNavigate()

  useEffect(() => {
    Axios.get(`http://localhost:5000/getAllProducts`)
      .then((res) => setItems(res.data))
      .catch((err) => console.log(err));
  });

  const handleProduct = async (id) => {
    const result = await Axios.get(`http://localhost:5000/ProductDetails/${id}`)
    setModel(result.data)
    navigate('/ProductDetails')
    console.log(result.data)
  }

  return (
    <>
      {items.map((item) => {
        return (
          <div
            className="hover:cursor-pointer w-[30%]"
            key={item._id}
            onClick={()=> handleProduct(item._id)}
          >
            <img
              src={item.image}
              alt=""
              className="shadow-2xl w-[100%] h-96 object-cover"
            />
            <h1>{item.name}</h1>
            <h2>Price: {item.price}</h2>
          </div>
        );
      })}
    </>
  );
};

export default Product;
