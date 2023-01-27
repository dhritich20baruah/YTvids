import React from "react";
import { Link } from "react-router-dom";
const Nav = () => {
  return (
    <div>
      <nav class="bg-[#e5dfdc]">
        <div class="container mx-auto px-6 py-2 flex items-center justify-between">
          <Link to="/">
           <h1 class="text-gray-700 italic font-bold">iWatch</h1>
          </Link>
          <Link to="#"
                href="#"
                class="inline-block text-sm text-gray-700 px-4 py-2 leading-none border rounded-full hover:border-white hover:text-gray-500"
              >
                Sign In
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default Nav;
