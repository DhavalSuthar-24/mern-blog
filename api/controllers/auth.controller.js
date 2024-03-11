import User from "../models/user.model.js";
import bcyrptjs from 'bcryptjs'
export const signup = async(req,res)=>{
    const {username,email,password} = req.body;
    if(!username || !email || !password || email==="" || password==="" || username===""){

        return res.status(400).json({message:"Please fill in all fields"})
    }

    const hashedpassword =  await bcyrptjs.hashSync(password,12);

    const newUser = new User({username,email,password:hashedpassword})
 await newUser.save().then((user)=>{
     res.status(201).json({message:"User created successfully",user})
 }).catch((e)=>{
     res.status(400).json({message:"User not created"})
 })
}