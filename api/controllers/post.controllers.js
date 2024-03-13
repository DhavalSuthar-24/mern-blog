import { errorHandler } from "../utils/error.js"
import { Post } from "../models/post.model.js"
export const createPost = async(req,res,next)=>{
 
    if(!req.user.isAdmin){
        return next(errorHandler(400,"you are not admin"))
    }
    if(!req.body.title || !req.body.content){
        return next(errorHandler(400,"all fields are required"))
    }
    const slug= req.body.title.split(' ').join('-').toLowerCase().replace(

        /[^a-zA-Z0-9-]/g,'-'
    )
    const newPost = new Post({
       ...req.body,
        slug,userId:req.user.id
    })
    try{
        const post = await newPost.save()
        res.status(200).json(post)
    }catch(e){
        next(e)
    }
}