import { Router } from "express";
import { createPost, deletePost, getAllPost, getMyBlogs, getSinglePost, updatePost } from "../controllers/post.controllers.js";
import {  isAdmin, VerifyJWT } from "../middlewares/auth.middlewares.js";
import { upload } from "../middlewares/multer.middlewares.js";
const router=Router()

router.route("/").get(getAllPost);
router.route("/my-blogs").get(VerifyJWT, getMyBlogs);

router.route("/createPost")
  .post(VerifyJWT, upload.single("thumbnail"), createPost);

router.route("/:postId")
  .patch(VerifyJWT,updatePost)
  .delete(VerifyJWT,deletePost);
router.route("/:postId").get(getSinglePost);
export default router