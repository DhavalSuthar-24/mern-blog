import express from "express"
import {verifyUser} from "../utils/verifyUser.js"
import { createPost,getPosts,deletePost } from "../controllers/post.controllers.js";
const router = express.Router();


router.post("/create",verifyUser,createPost)
router.get("/getposts",verifyUser,getPosts)
router.delete('/deletepost/:postId/:userId',verifyUser,deletePost)

export default router