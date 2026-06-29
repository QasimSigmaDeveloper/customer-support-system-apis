import mongoose from "mongoose";
import { env } from "./env"

export const connectDB = async ()=>{
    try{
        await mongoose.connect(env.DB_URL)
        console.log("DB Connect Successfully")
    }catch(err){
        console.log("While connected DB: ",err)
        process.exit(1);
    }
}