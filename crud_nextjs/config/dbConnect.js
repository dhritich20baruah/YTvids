const key = require('./key').MongoURI
const mongoose = require("mongoose")

export default async function dbConnect(){
    await mongoose.connect(key,{
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(()=> console.log(' DB connected'))
}