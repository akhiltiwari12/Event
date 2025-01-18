import { config } from "dotenv";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import {dbConnect} from "./database/dbConnect.js";
import { errorMiddlerware } from "./Middleware/error.js";
import userRoute from "./Routes/userRoute.js";
import eventRoute from "./Routes/eventRoute.js";
import taskRoute from "./Routes/taskRoute.js";
import attendeeRoute from "./Routes/attendeeRoutes.js"

config({
    path:"./config/config.env"
})
const app=express();

app.use(cors({
    origin:process.env.FRONTEND_URL,
    methods:["POST","GET","DELETE","PUT"],
    credentials:true
}));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use("/api/v1/user",userRoute);
app.use("/api/v1/event",eventRoute);
app.use("/api/v1/task",taskRoute);
app.use("/api/v1/attendee",attendeeRoute);


dbConnect();

app.use(errorMiddlerware);


export default app; 