import express from "express"

import dotenv from "dotenv"
import route from "./routes/userRoute.js";

const app=express();
dotenv.config();
const PORT=process.env.PORT||5000;

app.use("/api/user",route);