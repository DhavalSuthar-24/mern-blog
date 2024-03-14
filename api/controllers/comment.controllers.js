import { Comment } from "../models/comment.model.js";
import { errorHandler } from "../utils/error.js";
export const createComment = async(req,res,next)=>{
    try{
         const {content,postId,userId} = req.body;
         if(userId !== req.user._id){
             return next(errorHandler(400,"you are not allowed to comment on this post"))
         }
         const newComment = new Comment({
             content,
             postId,
             userId
         })
         await newComment.save();

         res.status(200).json(newComment)
         

    }catch(e){
        next(e)
    }
}