import { User } from "../models/userSchema.js";
import {catchAsyncError} from "../Middleware/catchAsyncError.js"
import ErrorHandler from "../Middleware/error.js";
import { generateJwtToken } from "../utils/jwtToken.js";

export const signUp=catchAsyncError(async(req,res,next)=>{
    const {name,email,password}=req.body;
    if(!name || !email || !password )
        return next(new ErrorHandler("Enter all details!",400));
    const currUser=await User.findOne({email});
    if(currUser)
        return next(new ErrorHandler("Email already exists!",400));
    const user=await User.create({name,email,password});
   await generateJwtToken(user,"User Created Successfully!",200,res);
})

export const login=catchAsyncError(async(req,res,next)=>{
    const {email,password}=req.body;
    if(!email || !password)
        return next(new ErrorHandler("Enter both email and password!",400));
    const user= await User.findOne({email});
    if(!user)
        return next(new ErrorHandler("Email doesn't found!",404));
    const myPassword=await user.comparePassword(password);
    if(!myPassword)
        return next(new ErrorHandler("Wrong Password!",400));

    await generateJwtToken(user,"User Logged In Successfully!",200,res);
})

export const logout=catchAsyncError(async(req,res,next)=>{
    res.status(200).cookie("token","",{
        expires:new Date(Date.now()),
        httpOnly:true
    }).json({
        success:true,
        message:"Logout Successfull!",
    });
})

export const me=catchAsyncError(async (req,res,next)=>{
    const user=req.user;
    res.status(200).json({
        success:true,
        user
    })
});