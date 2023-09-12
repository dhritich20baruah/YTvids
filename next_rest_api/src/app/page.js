"use client";
import React, { useState } from "react";
import Link from "next/link";
import Axios from "axios";
import Paginate from "./components/Paginate";
import Pagination from "./components/Pagination";

export default function Home() {
  //Post quotes
  const [quote, setQuote] = useState("");
  const [newquote, setNewQuote] = useState("");
  const [quoteId, setQuoteId] = useState("");
  const [quotesArr, setQuotesArr] = useState([]);
  const [visibility, setVisibility] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const handleSubmit = async () => {
    const quoteObj = {
      quote: quote,
    };
    await Axios.post(`/api/quotes`, quoteObj).then(() => {
      alert("Posted");
    });
  };

  //Get quotes
  const getQuotes = async () => {
    try {
      const response = await Axios.get("http://localhost:3000/api/quotes");
      const quotesArr = response.data;
      setQuotesArr(quotesArr);
    } catch (error) {
      console.error(error);
    }
  };
  // getQuotes();

  const pageSize = 3;
  const onPageChange = (page) => {
    setCurrentPage(page);
  };

  const paginatedQuotes = Paginate(quotesArr, currentPage, pageSize);
  //Delete Quotes
  const deleteQuotes = async (id) => {
    await Axios.delete(`http://localhost:3000/api/quotes/${id}`).then(() => {
      alert("Deleted");
    });
  };

  //Edit Quotes

  const editForm = (quote, quoteId) => {
    setVisibility((visibility) => !visibility);
    setNewQuote(quote);
    setQuoteId(quoteId);
  };

  const updateQuote = async (id) => {
    const quoteObj = {
      quote: newquote,
    };
    console.log(quoteObj);
    await Axios.put(`http://localhost:3000/api/quotes/${id}`, quoteObj).then(
      () => {
        alert("Updated");
      }
    );
  };

  return (
    <main className="space-y-10">
      <nav className="px-5 text-white bg-indigo-800">
        <ul className="flex space-x-5 ">
          <li className="hover:cursor-pointer hover:text-orange-600">
            <Link href="/display">Display</Link>
          </li>
          <li className="hover:cursor-pointer hover:text-orange-600">
            <Link href="/search">Search</Link>
          </li>
          <li className="hover:cursor-pointer hover:text-orange-600">
            <Link href="/pagination">Pagination</Link>
          </li>
        </ul>
      </nav>
      <form className="m-10">
        <label htmlFor="quote">
          Enter Quote
          <input
            type="text"
            name="quote"
            id="quote"
            value={quote}
            onChange={(event) => setQuote(event.target.value)}
            className="shadow-xl shadow-slate-500 w-[75%] h-10 p-2 outline-none"
          />
        </label>
        <button className="p-2 text-white bg-orange-500 hover:cursor-pointer" onClick={handleSubmit}>
          Submit
        </button>
      </form>
      <div className="m-10">
        {paginatedQuotes.map((element) => {
          return (
            <ul key={element._id} className="flex justify-between">
              <li className="w-[90%] italic text-lg font-serif">"{element.quote}"</li>
              <li className="w-[10%] flex">
                <button
                  className="mx-1 text-red-600 p-1 border-2 border-red-600 hover:cursor-pointer hover:bg-red-400 hover:text-white rounded-md"
                  onClick={() => deleteQuotes(element._id)}
                >
                  Delete
                </button>
                <button
                  className="mx-1 text-green-600 p-1 border-2 border-green-600 hover:cursor-pointer hover:bg-green-400 hover:text-white rounded-md"
                  onClick={() => editForm(element.quote, element._id)}
                >
                  Edit
                </button>
              </li>
            </ul>
          );
        })}
      </div>
      <Pagination
        items={quotesArr.length}
        currentPage={currentPage}
        pageSize={pageSize}
        onPageChange={onPageChange}
      />
      {visibility && (
        <form>
          <label htmlFor="quote">
            <input
              type="text"
              name="quote"
              id="quote"
              value={newquote}
              onChange={(event) => setNewQuote(event.target.value)}
              className="border-2 border-gray-400 p-2"
            />
          </label>
          <br />
          <button
            className="p-2 bg-orange-500"
            onClick={() => updateQuote(quoteId)}
          >
            Submit
          </button>
        </form>
      )}
    </main>
  );
}
