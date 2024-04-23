"use client"
import { useRouter } from "next/navigation";
import { useLayoutEffect } from "react";

export default function Cart(){
    const router = useRouter()
    useLayoutEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
          router.replace("/Login");
        }
      }, []);
    return <div className="text-xl font-bold text-center m-20">Your Cart Items</div>
}