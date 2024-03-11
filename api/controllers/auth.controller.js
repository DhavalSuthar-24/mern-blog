import User from "../models/user.model.js";
import bcyrptjs from 'bcryptjs'
import { errorHandler } from "../utils/error.js";
export const signup = async(req,res,next)=>{
    const {username,email,password} = req.body;
    if(!username || !email || !password || email==="" || password==="" || username===""){

        next(errorHandler(400,"all fields are required"))
    }

    const hashedpassword =  await bcyrptjs.hashSync(password,12);

    const newUser = new User({username,email,password:hashedpassword})
 await newUser.save().then((user)=>{
     res.status(201).json({message:"User created successfully",user})
 }).catch((e)=>{
    next(e)
 })
}