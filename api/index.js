import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoute from "./routes/auth.route.js";
import userRoute from "./routes/user.route.js";
import postRoute from "./routes/post.route.js";
import commentRoute from "./routes/comment.route.js";
import cors from 'cors';
import cookieParser from "cookie-parser";
import path from 'path';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Static files
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, '/client/dist')));

// Routes
app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/post", postRoute);
app.use("/api/comment", commentRoute);

// Error handling middleware
app.use((err, req, res, next) => {
    const statuscode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    res.status(statuscode).json({ success: false, statuscode, message });
});

// Serve index.html for all other routes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
  });
  

// Database connection
mongoose.connect(process.env.MONGO).then(() => {
    console.log("Connected to database");
}).catch((err) => {
    console.error("Database connection error:", err);
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
