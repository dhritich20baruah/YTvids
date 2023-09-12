"use client";
import React, { useState } from "react";
import Link from "next/link";
import Axios from "axios";


export default function display() {
  const [quotesArr, setQuotesArr] = useState([]);
  const [searchTerm, setSearchTerm] = useState('')

  //Search quotes function
  const searchQuote = async () => {
    const searchObj = {
      searchTerm: searchTerm,
    };
    await Axios.post(`/api/search`, searchObj)
    .then((res) => {
      setQuotesArr(res.data);
    });
  }

  return (
    <div className="my-10">
      <Link href="/" className="m-10 font-bold hover:cursor-pointer p-2">
        &lt; &lt; Home
      </Link>
      <div className="search-bar flex justify-center m-10 ">
        <input type="text" name="search" id="search" placeholder="Search...." className="shadow-xl shadow-slate-500 w-[75%] h-10 p-2 outline-none" onChange={(e)=>setSearchTerm(e.target.value)}/>
        <button className="bg-orange-500 p-2 hover:cursor-pointer text-white " onClick={searchQuote}>Search</button>
      </div>
      {quotesArr.map((element) => {
        return (
          <>
          <ul key={element._id} className="flex justify-between mx-5">
            <li className="text-lg font-serif italic">"{element.quote}"</li>
          </ul>
          <hr />
          </>
        );
      })}
    </div>
  );
}
