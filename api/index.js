import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import authRoute from "./routes/auth.route.js"

dotenv.config()
mongoose.connect(process.env.MONGO).then(()=>{
    console.log("connected to database")
})
.catch((e)=>{
    console.log(e)
})
const app = express()
app.use(express.json())
app.use("/api/auth",authRoute)

app.listen(3000,()=>{
    console.log("listening on 3000")
})

app.use((err,req,res,next)=>{
    const statuscode = err.statusCode ||500
    const message = err.message || 'internal server error';
    res.status(statuscode).json({ success:false,statuscode,message})
})