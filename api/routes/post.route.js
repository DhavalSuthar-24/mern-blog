import express from "express"
import {verifyUser} from "../utils/verifyUser.js"
import { createPost,getPosts } from "../controllers/post.controllers.js";
const router = express.Router();


router.post("/create",verifyUser,createPost)
router.get("/getposts",verifyUser,getPosts)

export default router