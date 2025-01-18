import mongoose from "mongoose";

const eventSchema=new mongoose.Schema({
    name:String,
    desc:String,
    location:String,
    date:{
        type:String,
        required:true
    },
    
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
})

export const Event=mongoose.model("Event",eventSchema);