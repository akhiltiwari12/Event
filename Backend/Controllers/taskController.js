import mongoose from "mongoose";
import { catchAsyncError } from "../Middleware/catchAsyncError.js";
import ErrorHandler from "../Middleware/error.js";
import {Event} from "../models/eventSchema.js"
import { Task } from "../models/taskSchema.js";


export const createTask=catchAsyncError(async(req,res,next)=>{
    const {id}=req.params;
    const {name,deadline}=req.body;
    if(!name || !deadline)
            return next(new ErrorHandler("All fields required!",400));
    const task=await Task.create({
        name,deadline,eventId:id
    });
    res.status(200).json({
        success:true,
        task
    })
})

export const getAllTask=catchAsyncError(async(req,res,next)=>{

    const tasks=await Task.find({eventId:req.params.id});
    res.status(200).json({
        success:true,
        tasks
    })
});

// export const updateTask=catchAsyncError(async(req,res,next)=>{
//     const {id}=req.params;
//     const {taskId}=req.params;
//     const {name,deadline}=req.body;
//     if(!mongoose.Types.ObjectId.isValid(taskId))
//         return next(new ErrorHandler("Id format is invalid",400));
//     const task=await Task.findByIdAndUpdate(taskId,{name,deadline,eventId:id},{
//         new:true,
//         runValidators:true,
//         useFindAndModify:false
        
//     });
//     res.status(200).json({
//         success:true,
//         task
//     })
// })

export const deleteTask=catchAsyncError(async(req,res,next) =>{
    const {taskId}=req.params;
    await Task.findByIdAndDelete(taskId);
    if(!mongoose.Types.ObjectId.isValid(taskId))
        return next(new ErrorHandler("Id format is invalid",400));
    res.status(200).json({
        success:true,
        message:"Task has been deleted",
    })
})

export const taskStatus=catchAsyncError(async(req,res,next)=>{
    const {taskId}=req.params;
    const {status}=req.body;
    await Task.findByIdAndUpdate(taskId,{status},{
        new:true,
        runValidators:true,
        useFindAndModify:false
        
    });
    res.status(200).json({
        success:true,
        message:"Status Changed"
    })
})