import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Nav = () => {
  const auth = localStorage.getItem('token')
  const navigate = useNavigate()
  const signOut = () =>{
    localStorage.clear()
    navigate('/')
  }
  return (
    <div>
      <nav className="bg-[#e5dfdc]">
        <div className="container mx-auto px-6 py-2 flex items-center justify-between">
          <div>
          <Link to="/">
           <h1 className="text-gray-700 italic font-bold">iWatch</h1>
          </Link>
          </div>
          <div>
           { auth ? 
           <div to="/" onClick={signOut}
           className="inline-block text-sm text-gray-700 px-4 py-2 mx-3 leading-none border rounded-full hover:border-white hover:text-gray-500 hover:cursor-pointer"
            >
           Sign Out
          </div> :
          <>
          <Link to="/SignIn"
                className="inline-block text-sm text-gray-700 px-4 py-2 mx-3 leading-none border rounded-full hover:border-white hover:text-gray-500 hover:cursor-pointer"
              >
                Sign In
          </Link>
          <Link to="/SignUp"
                className="inline-block text-sm text-gray-700 px-4 py-2 leading-none border rounded-full hover:border-white hover:text-gray-500 hover:cursor-pointer"
                >
                Sign Up
          </Link>
          </>
            }
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Nav;
