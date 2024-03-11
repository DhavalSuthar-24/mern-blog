import User from "../models/user.model.js";
import bcyrptjs from 'bcryptjs'
import { errorHandler } from "../utils/error.js";
import  jwt  from "jsonwebtoken";
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

export const signin = async(req,res,next)=>{
 const {email,password} = req.body;
 if(!email ||!password || email==="" || password===""){

    next(errorHandler(400,"all fields are required"))
 }
 try{
  const validuser = await User.findOne({email})
  if(!validuser){
    return next(errorHandler(404,"user not found"))
  }
  const isMatch = await bcyrptjs.compareSync(password,validuser.password)
  if(!isMatch){
     return next(errorHandler(401,"invalid password"))
  }
  const token = jwt.sign({_id:validuser._id},process.env.JWT_SECRET)
  const {password:pass,...rest}= validuser._doc

  
  res.status(200).cookie('access_token',token,{
    httpOnly:true
  }).json(rest)



 }
 catch(e){
    next(e)
 }
//  }
//  const user = await User.findOne({username})
//  if(!user){
//     next(errorHandler(404,"user not found"))
//  }
//  const isMatch = await bcyrptjs.compareSync(password,user.password)
//  if(!isMatch){
//     next(errorHandler(401,"invalid password"))
//  }
//  res.status(200).json({user})



}