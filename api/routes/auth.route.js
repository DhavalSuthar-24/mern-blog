import express from "express"
import { signup } from "../controllers/auth.controller.js"
const router = express.Router()
import { signin } from "../controllers/auth.controller.js"
router.post('/signup', signup)
router.post('/signin',signin)

export default router