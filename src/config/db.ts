import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const connectDB = async ()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI as string);
        console.log("kết nối thành công");
    }catch(error){
        console.error("kết nối mongoDB thất bại");
        process.exit(1);
    }
}
export default connectDB;