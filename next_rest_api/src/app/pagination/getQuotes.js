"use server";
import Quotes from "../model/Quotes";
import dbConnect from "../utils/dbConnect";
dbConnect();

export default async function getQuotes(pageNumber = 1, pageSize) {
  const result = await fetch('https://dummyjson.com/users')
  .then(res => res.json())
 
   const quotes = [...result.users]
   console.log(quotes.length)
  const startIndex = (pageNumber - 1) * pageSize;
  return quotes.slice(startIndex, startIndex + pageSize);
}

export async function quotesLength() {
  const result = await fetch('https://dummyjson.com/users')
  .then(res => res.json())
 
   const quotes = [...result.users]
  return quotes.length;
}
