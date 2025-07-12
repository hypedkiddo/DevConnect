import { Router } from "express"
import {upload} from "../middlewares/multer.middleware.js"
import {registerUser,loginUser,logoutuser} from "../controllers/user.controller.js"

const router=Router();
//Register route
router.route("/register").post(upload.fields([
    {
        name:"avatar",
        maxCount:1
    }
]),registerUser);
//Login route
router.route("/login").post(loginUser);
//Logout user
router.route("/logout").post(logoutuser);
export default router;