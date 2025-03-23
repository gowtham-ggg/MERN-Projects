import mongoose from "mongoose";

export const connectDB = async ()=>{
    try {
        const connection = await mongoose.connect(process.env.MONGODB_URI)
        console.log("Db connected successfully :", connection.connection.host);
        
    } catch (error) {
        console.log("Mongodb connection error : ", error);
        
    }
}