import Quotes from "@/app/model/Quotes";
import dbConnect from "@/app/utils/dbConnect";
import { NextResponse } from "next/server";
dbConnect();

export const POST = async (req, res) => {
  const { quote } = await req.json();
  console.log(quote)
  let newQuote = new Quotes({
    quote
  });
  await newQuote.save();
  return NextResponse.json({message: "Quote Added"});
};

export const GET = async (req, res) => {
  let quotes = await Quotes.find({})
  return NextResponse.json(quotes)
}

