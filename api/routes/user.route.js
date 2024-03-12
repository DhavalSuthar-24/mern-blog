import express from "express"
import { verifyUser } from "../utils/verifyUser.js";
import { updateUser } from "../controllers/user.controllers.js";
const router = express.Router()


router.put('/update/:userId',verifyUser,updateUser);



export default router