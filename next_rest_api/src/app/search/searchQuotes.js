"use server"
import Quotes from "../model/Quotes";
import dbConnect from "../utils/dbConnect";
dbConnect();

export default async function searchQuotes (str){
    let searchTerm = `${str}`;

    const convertToLowerCase = (text) => {
      const convertedText = text.replace(/[A-Z]/g, (match) =>
        match.toLowerCase()
      );
      return convertedText;
    };
    const searchTermLower = convertToLowerCase(searchTerm);

    const convertFirstLetterToCapital = (text) => {
      const convertedText = text.replace(/(^\w{1})|(\.\s*\w{1})/g, (match) =>
        match.toUpperCase()
      );
      return convertedText;
    };
    const searchTermFirst = convertFirstLetterToCapital(searchTerm);
    let quotes = await Quotes.find({
      $or: [
        {
          quote: { $regex: searchTermLower },
        },
        {
          quote: { $regex: searchTerm },
        },
        {
          quote: { $regex: searchTermFirst },
        },
      ],
    });
    return quotes
  };