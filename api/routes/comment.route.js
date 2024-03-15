import express from 'express';
import { verifyUser } from '../utils/verifyUser.js'
const router =express.Router();
import { createComment,getPostComments } from '../controllers/comment.controllers.js';

router.post('/create',verifyUser,createComment);
router.get('/getPostComments/:postId',getPostComments);

export default router



