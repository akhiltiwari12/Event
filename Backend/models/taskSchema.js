import mongoose from "mongoose";

const taskSchema=new mongoose.Schema({
    name:String,
    deadline:String,
    status:{
        type:String,
        enum:["Pending","Completed"],
        default:"Pending"
    },
    eventId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Event"
    }
});

export const Task=mongoose.model("Task",taskSchema);