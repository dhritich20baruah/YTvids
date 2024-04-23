"use client"
import React, { useState, useContext, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  const [visible, setVisible] = useState(true);

  function toggleVisible() {
    setVisible((visible) => !visible);
  }

  return (
    <div>
      <nav className="bg-gray-700 p-3 md:flex justify-between sm:flex">
        <div className="flex justify-between">
          <Link href="/">
            <p className="font-bold text-3xl italic font-mono text-white">SmartWatch</p>
          </Link>
         
          <div className="md:hidden" onClick={toggleVisible}>
            {!visible ? (
              <p className="font-bold text-2xl text-white">X</p>
            ) : (
              <div className="space-y-1 mt-2">
                <div className="bg-white h-1 w-5"></div>
                <div className="bg-white h-1 w-5"></div>
                <div className="bg-white h-1 w-5"></div>
              </div>
            )}
          </div>
        </div>
        <ul className="md:flex hidden space-x-3 text-white mx-4">
          <Link href="/">
            <li className="hover:cursor-pointer hover:bg-white hover:text-gray-600 p-3">
              HOME
            </li>
          </Link>
          <Link href="/About">
            <li className="hover:cursor-pointer hover:bg-white hover:text-gray-600 p-3">
              ABOUT
            </li>
          </Link>
          <Link href="/Shop">
            <li className="hover:cursor-pointer hover:bg-white hover:text-gray-600 p-3">
              SHOP
            </li>
          </Link>
          <Link href="/Dashboard">
            <li className="hover:cursor-pointer hover:bg-white hover:text-gray-600 p-3">
              DASHBOARD
            </li>
          </Link>
        </ul>
      </nav>
      <div className="mobile md:hidden z-30">
        {!visible && (
          <ul className="space-y-1 text-center bg-gray-700 text-white w-[100%]">
            <Link href="/">
              <li className="hover:cursor-pointer hover:bg-white hover:text-gray-600 p-3 border-b-2 border-white">
                HOME
              </li>
            </Link>
            <Link href="/About">
              <li className="hover:cursor-pointer hover:bg-white hover:text-gray-600 p-3 border-b-2 border-white">
                ABOUT 
              </li>
            </Link>
            <Link href="/Shop">
              <li className="hover:cursor-pointer hover:bg-white hover:text-gray-600 p-3 border-b-2 border-white">
                SHOP
              </li>
            </Link>
            <Link href="/Dashboard">
              <li className="hover:cursor-pointer hover:bg-white hover:text-gray-600 p-3 border-b-2 border-white">
                DASHBOARD
              </li>
            </Link>
          </ul>
        )}
      </div>
    </div>
  );
};

export default Navbar;
