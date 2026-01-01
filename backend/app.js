import express from "express"
import { config } from "dotenv";
import cors from "cors"
import cookieParser from "cookie-parser";

const app=express()

config()

app.use(cors({
    origin:process.env.FRONTEND_URL,
    credentials:true
}))


app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())

export default app;
