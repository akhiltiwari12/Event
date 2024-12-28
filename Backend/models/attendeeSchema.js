import mongoose from "mongoose";

const attendeeSchema=new mongoose.Schema({
    name:String,
    eventId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Event",
    },
    taskId:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Task"
    }]
})

export const Attendee=mongoose.model("Attendee",attendeeSchema);