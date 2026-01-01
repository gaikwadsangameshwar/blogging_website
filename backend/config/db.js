import mongoose from "mongoose";

const connectionToDB=async()=>{
    try {
        const connection=await mongoose.connect(process.env.MONGODB_URL) 
        console.log("The Database is connected",connection.connection.host)
    } 
    catch (error) {
        console.log("Database is not connected",error?.message)
        process.exit(1)
    }
}

export default connectionToDB;