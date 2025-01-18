import mongoose from "mongoose";
import { catchAsyncError } from "../Middleware/catchAsyncError.js";
import ErrorHandler from "../Middleware/error.js";
import {Event} from "../models/eventSchema.js"
import { Attendee } from "../models/attendeeSchema.js";


export const createAttendee=catchAsyncError(async(req,res,next)=>{
    const {id}=req.params;
    const {taskId}=req.params;
    const {name}=req.body;
    if(!name)
            return next(new ErrorHandler("All fields required!",400));
    const attendee=await Attendee.create({
        name,eventId:id,taskId
    });
    res.status(200).json({
        success:true,
        attendee
    })
})

export const getAllEventAttendee=catchAsyncError(async(req,res,next)=>{

    const attendee=await Attendee.find({eventId:req.params.id});
    res.status(200).json({
        success:true,
        attendee
    })
});

export const getAllTaskAttendee=catchAsyncError(async(req,res,next)=>{
    const {taskId}=req.params;
    const attendee=await Attendee.find({eventId:req.params.id,taskId});
    res.status(200).json({
        success:true,
        attendee
    })
});


export const deleteAttendee=catchAsyncError(async(req,res,next) =>{
    const {attendeeId}=req.params;
    await Attendee.findByIdAndDelete(attendeeId);
    if(!mongoose.Types.ObjectId.isValid(attendeeId))
        return next(new ErrorHandler("Id format is invalid",400));
    res.status(200).json({
        success:true,
        message:"Attendee has been deleted",
    })
})