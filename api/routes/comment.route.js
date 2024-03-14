import express from 'express';
import { verifyUser } from '../utils/verifyUser.js'
const router =express.Router();
import { createComment } from '../controllers/comment.controllers.js';

router.post('/create',verifyUser,createComment);

export default router



