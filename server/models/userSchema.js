import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema=new mongoose.Schema({
   name:{
    type:String,
    minLength:[3,"Username should be more than 3 characters"],
    maxLength:[20,"Username must not exceed 20 characters"]
   },
   email:String,
   password:{
    type:String,
    selected:false,
   },
   eventId:[
    {
    type:mongoose.Schema.Types.ObjectId,
    ref:"Event"
   }
  ],
    createdAt: {
    type: Date,
    default: Date.now,
  },
});


userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
      next();
    }
    this.password = await bcrypt.hash(this.password, 10);
  });
  
  userSchema.methods.comparePassword=async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password);
  }
  
  userSchema.methods.generateJsonWebToken= function(){
    return jwt.sign({id:this._id},process.env.JWT_SECRET_KEY,{
      expiresIn:process.env.JWT_EXPIRES_IN
    })
  }
  
  export const User=new mongoose.model("User",userSchema);