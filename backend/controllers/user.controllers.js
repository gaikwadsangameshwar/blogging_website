import { ApiResponse } from "../utils/ApiResponse.js"
import { ApiError } from "../utils/ApiError.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js"
import asyncHandler from "../utils/asyncHandler.js"
import { User } from "../models/userModels.js"

const generateAccessAndRefreshToken=async(GetUserId)=>{
    try {
    const user = await User.findById(GetUserId)  
    const accessToken= user.generateAccessToken()
    const refreshToken=user.generateRefreshToken()


    user.refreshToken=refreshToken
    await user.save({validateBeforeSave:false})

    return{accessToken,refreshToken}
    } 
    catch (error) {
        throw new ApiError(401,"something went wrong while generating a Access and refresh token")    
    }
}

const registerUser = asyncHandler(async (req, res) => {

    const { username, email, password } = req.body

    if (!username || !email || !password) {
        throw new ApiError(400, "All fields are required")
    }

    const userExisted = await User.findOne({
        $or: [{ email }, { username }]
    })

    if (userExisted) {
        throw new ApiError(409, "User already registered")
    }

    const avatarLocalPath = req.files?.avatar?.[0]?.path

    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar is required")
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath)

    if (!avatar?.url) {
        throw new ApiError(500, "Avatar upload failed")
    }

    const user = await User.create({
        username,
        email,
        password,
        avatar: avatar.url
    })

    const createdUser = await User.findById(user._id)
        .select("-password -refreshToken")

    if (!createdUser) {
        throw new ApiError(500, "User registration failed")
    }

    return res.status(201).json(
        new ApiResponse(201, createdUser, "User registered successfully")
    )
})

const login=asyncHandler(async(req,res)=>{

    const{username,email,password}=req.body

    if(!email && !username){
        throw new ApiError(401,"All Fields are required")
    }

    const GetUser = await User.findOne({
        $or: [{username}, {email}]
    })

    if(!GetUser){
        throw new ApiError(401,"User is not existed")
    }

    const isPasswrdValid=await GetUser.isPasswordCorrect(password)
    
    if(isPasswrdValid){
        throw new ApiError(401,"password is invalid")
    }

    const{accessToken,refreshToken}= await generateAccessAndRefreshToken(GetUser._id)
    
    const loggedInUser=await User.findById(GetUser._id).select("-password -refreshToken")

    const options={
        httpOnly:true,
        secure:true
    }

    return res
    .status(200)
    .cookie("accessToken",accessToken,options)
    .cookie("refreshToken",refreshToken,options)
    .json( 
        new ApiResponse(
            200,
            {
                user:loggedInUser,accessToken,refreshToken
            },
            "User logged Succesfully..."
        )
    )
})

const logout=asyncHandler(async(req,res)=>{
    
})

export { registerUser,login,logout }
