import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { config } from "dotenv";

config();

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://my-personal-gamma.vercel.app"
    ],
    credentials: true,
  })
);

app.options("*", cors());

app.use(express.json());
app.use(cookieParser());


app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))

app.get("/", (req, res) => {
  res.send("Backned running 🚀");
});

app.use("/api/v1/users",userRouter)
app.use("/api/v1/posts",postRouer)
app.use("/api/v1/comments",commentsRouter)
export default app;
