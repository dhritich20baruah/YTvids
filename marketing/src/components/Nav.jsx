import React from "react";

const Nav = () => {
  return (
    <div>
      <nav class="bg-gray-800">
        <div class="container mx-auto px-6 py-2 flex items-center justify-between">
          <a href="#" class="text-white font-medium">
            Logo
          </a>
          <div class="block lg:hidden">
            <button class="flex items-center px-3 py-2 text-white border-2 border-white rounded-md hover:text-gray-500">
              <svg
                class="fill-current h-3 w-3"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>Menu</title>
                <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
              </svg>
            </button>
          </div>
          <div class="w-full block flex-grow lg:flex lg:items-center lg:w-auto hidden">
            <div class="text-sm lg:flex-grow">
              <a
                href="#"
                class="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-gray-500 mr-4"
              >
                Home
              </a>
              <a
                href="#"
                class="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-gray-500 mr-4"
              >
                About
              </a>
              <a
                href="#"
                class="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-gray-500"
              >
                Contact
              </a>
            </div>
            <div>
              <a
                href="#"
                class="inline-block text-sm text-white px-4 py-2 leading-none border rounded-full hover:border-white hover:text-gray-500"
              >
                Sign In
              </a>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Nav;
