import { NextResponse } from "next/server";
import Products from "@/app/model/Products";
import dbConnect from "@/app/utils/dbConnect";
dbConnect()

export async function POST(request) {
    const {name, brand, price, quantity} = await request.json()
    let newProduct = new Products({
        name, brand, price, quantity
    })
    await newProduct.save()
    return NextResponse.json({message: "Product saved"})
}

export async function GET(request){
    let product = await Products.find({})
    return NextResponse.json(product)
}