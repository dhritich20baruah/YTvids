import React, { useEffect, useState, useContext } from "react";
import parse from "html-react-parser";
import Axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate, Link } from "react-router-dom";
import { productContext } from "./Context";

const ProductDetails = () => {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [details, setDetails] = useState("");
  const [id, setId] = useState('')
  let [visible, setVisible] = useState(false);
  const {count, setCount} = useContext(productContext)
  const params = useParams();
  const auth = localStorage.getItem('token')
  const navigate = useNavigate()

  useEffect(() => {
    getProduct();
  }, []);

  const getProduct = async () => {
    const result = await Axios.get(
      `http://localhost:5000/ProductDetails/${params.id}`
    );

    let model = result.data;

    setName(model.name);
    setImage(model.image);
    setDescription(model.description);
    setPrice(model.price);
    setDetails(model.details);
    setId(model._id)
  };

  function checkAuthCart(){
    if(auth){
      alert('Added to cart')
      setCount(count+1)
    }else{
      setVisible(visible =!visible)
    }
  }

  function checkAuthBuy(){
    if(auth){
      navigate('/CheckOut')
    }else{
      setVisible(visible =!visible)
    }
  }

  return (
    <>
      <div className="grid md:grid-cols-2 grid-cols-1 gap-10 justify-items-center m-5">
        <div className="w-[90%] shadow-2xl">
          <img src={image} alt="" className="h-[40rem] mr-auto ml-auto" />
          <div className="text-white font-bold mr-auto text-center">
            <button className="bg-yellow-500 p-2 m-2" onClick={checkAuthCart}>ADD TO CART</button>
            <button className="bg-orange-600 p-2 m-2" onClick={checkAuthBuy}>BUY NOW</button>
          </div>
        </div>
        <div className="space-y-2 w-[90%]">
          <h1 className="text-gray-800 font-bold text-2xl">{name}</h1>
          <p className="font-bold text-red-700">Price {price}</p>
          <h1 className="text-gray-800 font-bold text-lg">
            Product Description
          </h1>
          <div className="font-semibold text-justify">{parse(description)}</div>
          <h2 className="text-gray-800 font-bold text-lg">Product Details</h2>
          <div className="font-semibold text-justify">{parse(details)}</div>
        </div>
      </div>
      {visible && (
        <div className="bg-yellow-400 text-xl absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-96 h-96">
          <h1
            className="text-right m-5 font-bold hover:cursor-pointer text-red-900"
            onClick={() => setVisible(visible = !visible)}
          >
            X
          </h1>
          <div className="text-center mt-32">
            <h1>
              Please
              <Link
                to="/Signin"
                className="text-blue-700 underline font-bold hover:cursor-pointer"
              >
                 Signin
              </Link>
              .
            </h1>
            <h1>
              If not registered then
              <Link
                to="/Signup"
                className="text-blue-700 underline font-bold hover:cursor-pointer"
              >
                 SignUp here
              </Link>
            </h1>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductDetails;
