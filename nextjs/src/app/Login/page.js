"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
const jwt = require("jsonwebtoken");

export default function Login(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
  
    const router = useRouter();
  
    const handleSubmit = async (event) => {
      event.preventDefault();
      const adminObj = {
        email,
        password,
      };
  
      const result = await axios.post("/api/signIn", adminObj);
      const data = result.data;
      if (data.token) {
        localStorage.setItem("token", data.token);
        alert("Sign In Successful");
        router.push("/Dashboard");
      } else {
        alert("Please check email and password");
      }
    };
    return(
        <>
        <div className="h-screen w-full flex justify-center items-center">
          <div className="p-5 bg-gray-500 flex flex-col space-y-3">
            <input
              type="email"
              placeholder="Email"
              className="p-2 w-[100%]"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              className="p-2 w-[100%]"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              className="p-2 text-white bg-orange-600"
              onClick={handleSubmit}
            >
              SUBMIT
            </button>
          </div>
        </div>
      </>
    )
}