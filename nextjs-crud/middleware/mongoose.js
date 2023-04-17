import mongoose from "mongoose"

const connectDb = async (handler)=>{
    if(mongoose.connections[0].readyState){
        return handler(request, response)
    }
    await mongoose.connect('mongodb://localhost/nextJScrud')
    return handler(request, response)
}

export default connectDb