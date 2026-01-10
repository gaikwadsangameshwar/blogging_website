import { Router } from "express";
import { createPost, deletePost, getAllPost, getSinglePost, updatePost } from "../controllers/post.controllers.js";
import {  isAdmin, VerifyJWT } from "../middlewares/auth.middlewares.js";
import { upload } from "../middlewares/multer.middlewares.js";
const router=Router()

router.route("/").get(getAllPost);
router.route("/:postId").get(getSinglePost);

router.route("/createPost")
  .post(VerifyJWT, isAdmin, upload.single("thumbnail"), createPost);

router.route("/:postId")
  .patch(VerifyJWT, isAdmin, updatePost)
  .delete(VerifyJWT, isAdmin, deletePost);

export default router