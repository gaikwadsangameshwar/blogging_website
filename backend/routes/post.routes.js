import { Router } from "express";
import { createPost } from "../controllers/post.controllers.js";
import { VerifyJWT } from "../middlewares/auth.middlewares.js";
import { upload } from "../middlewares/multer.middlewares.js";
const router=Router()

router.route("/createPost").post(VerifyJWT,upload.single("thumbnail"),createPost)

export default router