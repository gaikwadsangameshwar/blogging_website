import express from "express"
import { config } from "dotenv";
import cors from "cors"
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.routes.js"
import postRouer from "./routes/post.routes.js"
import commentsRouter from "./routes/comments.routes.js"

const app=express()

config()

app.use(
  cors({
    origin: (origin, callback) => {
      const allowedOrigins = [
        "http://localhost:5173",
        "http://localhost:3000",
        process.env.FRONTEND_URL
      ];

      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true
  })
);



app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())

app.get("/", (req, res) => {
  res.send("Backned running 🚀");
});

app.use("/api/v1/users",userRouter)
app.use("/api/v1/posts",postRouer)
app.use("/api/v1/comments",commentsRouter)
export default app;
