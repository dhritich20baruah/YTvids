"use server"
import mongoose from "mongoose"
import Products from "../model/Products"

export default async function searchResult(str){
    await mongoose.connect("mongodb://127.0.0.1:27017/nextProducts", {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })

    let searchTerm = `${str}`

    const convertFirstLetter = (text) => {
        const convert = text.replace(/(^\w{1})|(\.\s*\w{1})/g, (match)=>match.toUpperCase())
        return convert
    }

    const searchTermFirst = convertFirstLetter(searchTerm)

    let results = await Products.find({
        $or: [
            {
                name: {$regex: searchTerm}
            },
            {
                name: {$regex: searchTermFirst}
            },
            {
                brand: {$regex: searchTerm}
            },
            {
                brand: {$regex: searchTermFirst}
            }
        ]
    })

    return results
}