import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv/config";
import authRouter from './routes/Auth.js';
import userRouter from './routes/User.js';
import postRouter from './routes/Post.js';


const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use('/api/posts', postRouter); 

mongoose.connect(process.env.CONNECTION_STRING)
.then(()=>console.log("Connected to database"))
.catch((err) => console.log(err));

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);

});