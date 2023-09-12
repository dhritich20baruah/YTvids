"use client";
import React, { useState, useEffect } from "react";
import getQuotes, { quotesLength } from "./getQuotes";

const PaginatedQuotes = async () => {
  // Pagination
  const [currentPage, setCurrentPage] = useState(0)
  const [quotesArr, setQuotesArr] = useState([])
  const [length, setLength] = useState(0)

  useEffect(async() => {
  const result = await fetch('https://dummyjson.com/users')
  .then(res => res.json())
 
  setQuotesArr(...result.users)
  console.log(quotesArr.length)
  setLength(quotesArr.length)
  }, [])
  
 //Pagination
  const pageSize = 6;
  const pagesCount = Math.ceil(length / pageSize);

  if (pagesCount === 1) return null;
  const pages = []
 
  for (let i = 1; i<= pagesCount; i++){
    pages.push(i)
  }

  const startIndex = (currentPage - 1) * pageSize;
  quotesArr.slice(startIndex, startIndex + pageSize);
  async function onPageChange(page){
    setCurrentPage(page)
    const result = await getQuotes(currentPage, pageSize);
    setQuotesArr(result)
    console.log(quotesArr)
  }
  
  return (
    <main className="m-10">
      <h1>Paginated Display</h1>
      <div className="m-10">
        <ul className="flex">
          <li className="flex-1">First Name</li>
          <li className="flex-1">Last Name</li>
          <li className="flex-1">Email ID</li>
          <li className="flex-1">Phone No.</li>
          <li className="flex-1">Domain Name</li>
        </ul>
        {quotesArr.map((element) => {
          return (
            <>
            <ul key={element._id} className="flex justify-between p-2">
              <li className="flex-1">{element.firstName}</li>
              <li className="flex-1">{element.lastName}</li>
              <li className="flex-1">{element.email}</li>
              <li className="flex-1">{element.phone}</li>
              <li className="flex-1">{element.domain}</li>
            </ul>
            <hr />
            </>
          );
        })}
      </div>
      {/* Pagination */}
      <div>
        <ul className="pagination flex justify-between items-center list-none">
          {pages.map((page) => (
            <li
              className={
                page === currentPage
                  ? "flex items-center justify-center w-8 h-8 border-2 border-slate-600 hover:cursor-pointer rounded-md bg-red-500"
                  : "flex items-center justify-center w-8 h-8 border-2 border-slate-600 hover:cursor-pointer rounded-md"
              }
              key={page}
            >
              <a
                onClick={() => onPageChange(page)}
                className="pagelink hover:cursor-pointer"
              >
                {page}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
};

export default PaginatedQuotes;
