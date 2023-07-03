import Products from "@/app/model/Products";
import dbConnect from "@/app/utils/dbConnect";
dbConnect()
import { NextResponse } from "next/server";

export async function PUT(request){
    const id = request.url.split('/')[5]
    const {name, brand, price, quantity} = await request.json()
    const updatedProduct = await Products.findByIdAndUpdate({ _id:id }, {name, brand, price, quantity})
    return NextResponse.json({message: 'Product Updated', updatedProduct})
}

export async function DELETE(request){
    const id = request.url.split('/')[5]
    const deletedProduct = await Products.findByIdAndDelete({ _id: id})
    return NextResponse.json({message: "Product Deleted", deletedProduct})
}