import mongoose from "mongoose";
import { catchAsyncError } from "../Middleware/catchAsyncError.js";
import ErrorHandler from "../Middleware/error.js";
import {Event} from "../models/eventSchema.js"


export const createEvent=catchAsyncError(async(req,res,next)=>{
    const {name,desc,location,date}=req.body;
    if(!name || !desc || !location || !date)
            return next(new ErrorHandler("All fields required!",400));
    const userId=req.user._id;
    
    const event=await Event.create({
        name,desc,location,date,userId
    });

    req.user.eventId=event._id;
    await req.user.save();
    res.status(200).json({
        success:true,
        event
    })
})

export const getAllEvents=catchAsyncError(async(req,res,next)=>{
    const events=await Event.find({userId :req.user._id});
    res.status(200).json({
        success:true,
        events
    })
});






export const updateEvent=catchAsyncError(async(req,res,next)=>{
    const {id}=req.params;
    const {name,desc,location,date}=req.body;
    if(!mongoose.Types.ObjectId.isValid(id))
        return next(new ErrorHandler("Id format is invalid",400));
    const event=await Event.findByIdAndUpdate(id,{name,desc,location,date},{
        new:true,
        runValidators:true,
        useFindAndModify:false
        
    });
    res.status(200).json({
        success:true,
        event
    })
})

export const deleteEvent=catchAsyncError(async(req,res,next) =>{
    const {id}=req.params;
    await Event.findByIdAndDelete(id);
    if(!mongoose.Types.ObjectId.isValid(id))
        return next(new ErrorHandler("Id format is invalid",400));
    res.status(200).json({
        success:true,
        message:"Event has been deleted",
    })
});

export const showEvent=catchAsyncError(async (req,res,next)=> {
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id))
        return next(new ErrorHandler("Id format is invalid",400));
    const event = await Event.findById(id);
    if(!event)
        return next(new ErrorHandler("Event not found!",404));
    res.status(200).json({
        success:true,
        event
    });

})