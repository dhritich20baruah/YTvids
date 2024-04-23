"use client";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Nav = () => {
  const router = useRouter()
  const logout = () => {
    localStorage.clear()
    router.replace('/')
  }
  return (
    <div>
      <ul className="flex space-x-10 p-5 justify-evenly bg-black text-white"> 
        <Link href="/Dashboard/Profile">
          <li>Profile</li>
        </Link>
        <Link href="/Dashboard/Orders">
          <li>Orders</li>
        </Link>
        <Link href="/Dashboard/Cart">
          <li>Cart</li>
        </Link>
        <Link href="/Dashboard/Checkout">
          <li>Checkout</li>
        </Link>
        <li onClick={logout} className="hover:cursor-pointer">Logout</li>
      </ul>
    </div>
  );
};

export default Nav;
