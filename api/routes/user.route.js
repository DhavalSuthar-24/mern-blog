import express from "express"
import { verifyUser } from "../utils/verifyUser.js";
import { updateUser,deleteUser,signOut } from "../controllers/user.controllers.js";
const router = express.Router()


router.put('/update/:userId',verifyUser,updateUser);
router.delete('/delete/:userId',verifyUser,deleteUser);
router.post("/signout",signOut)

export default router