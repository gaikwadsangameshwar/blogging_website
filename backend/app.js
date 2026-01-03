import express from "express"
import { config } from "dotenv";
import cors from "cors"
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.routes.js"
import postRouer from "./routes/post.routes.js"

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

app.use("/api/v1/users",userRouter)
app.use("/api/v1/posts",postRouer)

export default app;
