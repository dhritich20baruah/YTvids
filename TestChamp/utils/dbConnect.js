const key = process.env.MONGO_URI
const mongoose = require("mongoose")


export default async function dbConnect(){
    console.log(key)
    await mongoose.connect(key).then(()=> console.log(' DB connected'))
}