import Quotes from "@/app/model/Quotes";
import dbConnect from "@/app/utils/dbConnect";
import { NextResponse } from "next/server";

dbConnect();

export const DELETE = async (req, res) => {
  const id = req.url.split("quotes/")[1];
  const deletedQuote = await Quotes.findByIdAndDelete({ _id: id });
  if (!deletedQuote) {
    return NextResponse.status(404).json({ message: "Quote not found" });
  }
  return NextResponse.json({ message: "Quote Deleted" });
};

export const PUT = async (req, res) => {
    const id = req.url.split("quotes/")[1];
    const { quote } = await req.json();

    const updatedQuote = await Quotes.findByIdAndUpdate({ _id: id }, { quote });
    return NextResponse.json({ message: "Quote Updated" });
  };