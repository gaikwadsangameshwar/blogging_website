import { Router } from "express";
import { login, logout, registerUser } from "../controllers/user.controllers.js";
import { upload } from "../middlewares/multer.middlewares.js";

const router=Router()

router.route("/register").post(upload.fields([
    {
        name:"avatar",
        maxCount:1
    }
]), registerUser)

router.route("/login").post(login)
router.route("/logout").post(logout)

export default router;