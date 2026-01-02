import { User } from "../models/userModels.js";
import { ApiError } from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import JWT from "jsonwebtoken"

export const VerifyJWT=asyncHandler(async(req,res,next)=>{
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")

        if(!token){
            throw new ApiError(401,"Token is not created")
        }

        const decodedToken=JWT.verify(token,process.env.ACCESS_TOKEN_SECRET)

        if(!decodedToken){
            throw new ApiError(401,"decoded token is not generated")
        }

        const user=await User.findById(decodedToken?._id).select("-password -refreshToken")

        if(!user){
            throw new ApiError(400,"the User is invalid")
        }

        req.user=user
        next()
    } 
    catch (error) {
        throw new ApiError(500,error?.message,"Tokens is not created")
    }
})

export const isAdmin=asyncHandler(async(req,_,next)=>{

    if(!req.user){
        throw new ApiError(401,"unAuthorized")
    }
    
    if (req.user.role !== "admin") {
        throw new ApiError(403, "Access denied: Admin only");
    }
    next()
})