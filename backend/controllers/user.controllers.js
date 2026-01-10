import { ApiResponse } from "../utils/ApiResponse.js"
import { ApiError } from "../utils/ApiError.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js"
import asyncHandler from "../utils/asyncHandler.js"
import { User } from "../models/userModels.js"
import { Post } from "../models/postModels.js"
import JWT from "jsonwebtoken"

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
    
    if(!isPasswrdValid){
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
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $set:{
                refreshToken:undefined
            }
        },
        {
            new:true
        }
    )

    const options={
        httpOnly:true,
        secure:true
    }
    return res
    .status(200)
    .clearCookie("accessToken",options)
    .clearCookie("refreshToken",options)
    .json(
        new ApiResponse(201,{},"user Logout sucessfully")
    )
}) 

const refreshAccessToken = asyncHandler(async (req, res) => {
    const incomingRefreshToken =
        req.cookies?.refreshToken || req.body?.refreshToken

    if (!incomingRefreshToken) {
        throw new ApiError(401, "Unauthorized request")
    }

    try {
        const decodedToken = JWT.verify(
            incomingRefreshToken,
            process.env.REFRESH_TOKEN_SECRET
        )

        const user = await User.findById(decodedToken._id)

        if (!user) {
            throw new ApiError(401, "Invalid refresh token")
        }

        if (incomingRefreshToken !== user.refreshToken) {
            throw new ApiError(401, "Refresh token expired or already used")
        }

        const { accessToken, refreshToken } =
            await generateAccessAndRefereshTokens(user._id)

        
        const options = {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        }

    
        return res
            .status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", refreshToken, options)
            .json(
                new ApiResponse(
                    200,
                    { accessToken, refreshToken },
                    "Access token refreshed successfully"
                )
            )

    } catch (error) {
        throw new ApiError(500, error.message || "Invalid refresh token")
    }
})


const getSingleUser=asyncHandler(async(req,res)=>{
    const user=await User.findById(req.user?._id).select("-password -refreshToken")

    if(!user){
        throw new ApiError(401,"user is not getting")
    }

    return res.status(200).json(
        new ApiResponse(201,user,"Current user is get successfully")
    )
})

const getAllUsers=asyncHandler(async(req,res)=>{

    const user=await User.find({}).select("-password -refreshToken")

    return res.status(200).json(
        new ApiResponse(201,user,"Get All the users")
    )
})

const changeUserPassword =asyncHandler(async(req,res)=>{
    const {oldPassword,newPassword}=req.body

    const user=await User.findById(req.user?.id)

    const PasswordValidation=await user.isPasswordCorrect(oldPassword)
    if(!PasswordValidation){
        throw new ApiError(401,"Password is incorrect")
    }

    user.password=newPassword;
    await user.save({validateBeforeSave:false})

    return res
    .status(200)
    .json(
        new ApiResponse(201,{},"Password is change")
    )
})

const changeUserAvatar=asyncHandler(async(req,res)=>{

    const avatarLocalPath= req.file?.path

    if(!avatarLocalPath){
        throw new ApiError(401,"avatar is missing")
    }

    const avatar=await uploadOnCloudinary(avatarLocalPath)
    if(!avatar.url){
        throw new ApiError(401,"avatar is missing while uploading")
    }

    const user = await User.findByIdAndUpdate(
        req.user?._id,
        {
            $set:{
                avatar: avatar.url
            }
        },
        {
            new: true
        }
    ).select("-password")

    return res
    .status(200)
    .json(
        new ApiResponse(200, user, "Avatar image updated successfully")
    )
})

const changeAccountDetails=asyncHandler(async(req,res)=>{
        
    try {
    const { username, email } = req.body

    if (!username || !email) {
        throw new ApiError(400, "All fields are required")
    }

    const existingUser = await User.findOne({
        _id: { $ne: req.user._id },
        $or: [{ username }, { email }]
    })

    if (existingUser) {
        throw new ApiError(409, "Username or email already exists")
    }

    const user = await User.findByIdAndUpdate(
        req.user._id,
        {
            $set: { username, email }
        },
        {
            new: true,
            runValidators: true
        }
    ).select("-password")

    return res.status(200).json(
        new ApiResponse(200, user, "User details updated successfully")
    )

} catch (error) {
    throw new ApiError(
        error.statusCode || 500,
        error.message || "User update failed"
    )

}

})

const toggleLike = asyncHandler(async (req, res) => {
    const { postId } = req.params;
    const userId = req.user._id; 

    const post = await Post.findById(postId);
    const user = await User.findById(userId);

    if (!post || !user) {
        throw new ApiError(404, "Post or user not found");
    }

    const hasLiked = post.likes.includes(userId);

    if (hasLiked) {
        post.likes.pull(userId);
        user.likedPosts.pull(postId);
    } else {
        post.likes.push(userId);
        user.likedPosts.push(postId);
    }

    await post.save();
    await user.save();

    res.status(200).json(
        new ApiResponse(200, {
            postId,
            liked: !hasLiked,
            totalLikes: post.likes.length
        }, `Post ${!hasLiked ? "liked" : "unliked"} successfully`)
    );
});



export { 
    changeAccountDetails,
    changeUserAvatar,
    changeUserPassword,
    refreshAccessToken,
    getAllUsers,
    getSingleUser,
    registerUser,
    login,
    logout,
    toggleLike 
}
