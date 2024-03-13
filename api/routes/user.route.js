import express from "express"
import { verifyUser } from "../utils/verifyUser.js";
import { updateUser,deleteUser } from "../controllers/user.controllers.js";
const router = express.Router()


router.put('/update/:userId',verifyUser,updateUser);
router.delete('/delete/:userId',verifyUser,deleteUser);


export default router