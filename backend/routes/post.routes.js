import { Router } from "express";
import { createPost, deletePost, getAllPost, getSinglePost, updatePost } from "../controllers/post.controllers.js";
import { isAdmin, VerifyJWT } from "../middlewares/auth.middlewares.js";
import { upload } from "../middlewares/multer.middlewares.js";
const router=Router()

router.route("/").get(VerifyJWT,isAdmin,getAllPost)
router.route("/createPost").post(VerifyJWT,upload.single("thumbnail"),createPost)
router.route("/:postId").get(VerifyJWT,getSinglePost)
router.route("/:postId").patch(VerifyJWT,updatePost)
router.route("/:postId").delete(VerifyJWT,deletePost)

export default router