import mongoose, {Schema, Document, Model} from "mongoose";

type UserType = Document & {
    name: string;
    country: string;
    city: string;
    age: number;
    email: string;
    phone: string;
    company: string;
    height: string
}

const userSchema: Schema<UserType> = new Schema({
    name: String,
    country: String,
    city: String,
    age: Number,
    email: String,
    phone: String,
    company: String,
    height: String
})

const User: Model<UserType> = mongoose.model<UserType>('User', userSchema)

export default User