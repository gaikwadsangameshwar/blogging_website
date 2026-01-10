import { ApiResponse } from "../utils/ApiResponse.js"
import { ApiError } from "../utils/ApiError.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js"
import asyncHandler from "../utils/asyncHandler.js"
import { Post } from "../models/postModels.js"
import mongoose from "mongoose"

const createPost = asyncHandler(async (req, res) => {

  try {
        console.log("req.file:", req.file);
        console.log("req.body:", req.body);
    
        const { title, context, category } = req.body;
    
        if (!title || !context || !category) {
        throw new ApiError(400, "All fields are required");
        }
    
        const thumbnailLocalPath = req.file?.path;
    
        if (!thumbnailLocalPath) {
        throw new ApiError(400, "Thumbnail is required");
        }
    
        const uploadedImage = await uploadOnCloudinary(thumbnailLocalPath);
    
        if (!uploadedImage?.secure_url) {
        throw new ApiError(500, "Image upload failed");
        }
    
        const post = await Post.create({
            title,
            context,
            category,
            thumbnail: uploadedImage.secure_url,
            author: req.user._id,
        });
    
        return res.status(201).json(
        new ApiResponse(201, post, "Post created successfully")
        );
    } 
    catch (error) {
        throw new ApiError(500,error?.message,"Post is not created")  
    }
});

const getSinglePost=asyncHandler(async(req,res)=>{

    try {
        const {postId}=req.params

        if(!postId){
            throw new ApiError(401,"Post Id is required")
        }

       const post = await Post.findById(postId);

        if(!post){
            throw new ApiError(401,"Post was not found")
        }

        return res
        .status(200)
        .json(
            new ApiResponse(201,post,"Get the Single Post")
        )

    } 
    catch (error) {
        throw new ApiError(500,error?.message,"Single Post are not getting")     
    }

})

const getAllPost=asyncHandler(async(req,res)=>{
    try {
        const post=await Post.find({})

        return res
        .status(200)
        .json(
            new ApiResponse(201,post,"Get All Post Successfully")
        )
    } 
    catch (error) {
        throw new ApiError(500,error?.message,"All Post are not gettig")    
    }
})

const updatePost = asyncHandler(async (req, res) => {
    const { postId } = req.params
    const { title, context, category } = req.body

    if (!mongoose.Types.ObjectId.isValid(postId)) {
        throw new ApiError(400, "Invalid post ID")
    }

    if (!title && !context && !category) {
        throw new ApiError(400, "At least one field is required to update")
    }

    const post = await Post.findById(postId)

    if (!post) {
        throw new ApiError(404, "Post not found")
    }

    if (title) post.title = title
    if (context) post.context = context
    if (category) post.category = category

    await post.save()

    return res.status(200).json(
        new ApiResponse(200, post, "Post updated successfully")
    )
})


const deletePost=asyncHandler(async(req,res)=>{
    try {
        const{postId}=req.params

        if (!mongoose.Types.ObjectId.isValid(postId)) {
            throw new ApiError(400, "Invalid post ID")
        }

        const post=await Post.findByIdAndDelete(postId)

        if(!post){
            throw new ApiError(401,"the post was not found")
        }

        return res.status(200)
        .json(
            new ApiResponse(200,{},"Post deleted SuccessFully")
        )
    } 
    catch (error) {
     throw new ApiError(500,error?.message,"Post was not delete")    
    }
})

export {
    createPost,
    getAllPost,getSinglePost,updatePost,deletePost
}