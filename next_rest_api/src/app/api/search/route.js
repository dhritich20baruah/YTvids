import Quotes from "@/app/model/Quotes";
import dbConnect from "@/app/utils/dbConnect";
import { NextResponse } from "next/server";
dbConnect();

export const POST = async (req, res) => {
  const { searchTerm } = await req.json();
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
  let result = await Quotes.find({
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
  return NextResponse.json(result);
};
