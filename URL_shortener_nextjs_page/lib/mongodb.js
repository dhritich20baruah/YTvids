import mongoose from "mongoose";
const key = process.env.MONGO_URI

export default async function dbConnect(){
    await mongoose.connect(key).then(()=>console.log("db connected"))
}