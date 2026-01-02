import { Router } from "express";
import { changeUserAvatar, changeUserPassword, getAllUsers, getSingleUser, login, logout, registerUser } from "../controllers/user.controllers.js";
import { upload } from "../middlewares/multer.middlewares.js";
import { VerifyJWT,isAdmin } from "../middlewares/auth.middlewares.js";

const router=Router()

router.route("/").get(VerifyJWT,isAdmin,getAllUsers)

router.route("/register").post(upload.fields([
    {
        name:"avatar",
        maxCount:1
    }
]), registerUser)

router.route("/login").post(login)
router.route("/logout").post(VerifyJWT,logout)
router.route("/change-password").post(VerifyJWT,changeUserPassword)
router.route("/change-avatar").post(VerifyJWT,upload.single("avatar"),changeUserAvatar)
router.route("/me").get(VerifyJWT,getSingleUser)

export default router;