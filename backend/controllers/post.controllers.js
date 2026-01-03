import { ApiResponse } from "../utils/ApiResponse.js"
import { ApiError } from "../utils/ApiError.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js"
import asyncHandler from "../utils/asyncHandler.js"
import { Post } from "../models/postModels.js"


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


export {
    createPost
}