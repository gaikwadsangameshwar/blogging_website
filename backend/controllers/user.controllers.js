import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { User } from "../models/userModels.js";
import { Post } from "../models/postModels.js";
import jwt from "jsonwebtoken";



const generateAccessToken = async (userId) => {
  const user = await User.findById(userId);
  if (!user) throw new ApiError(401, "User not found");

  const accessToken = user.generateAccessToken();
  return accessToken;
};



const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    throw new ApiError(400, "All fields are required");
  }

  const existedUser = await User.findOne({
    $or: [{ email }, { username }],
  });

  if (existedUser) {
    throw new ApiError(409, "User already exists");
  }

  const avatarLocalPath = req.files?.avatar?.[0]?.path;
  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar is required");
  }

  const avatar = await uploadOnCloudinary(avatarLocalPath);
  if (!avatar?.url) {
    throw new ApiError(500, "Avatar upload failed");
  }

  const user = await User.create({
    username,
    email,
    password,
    avatar: avatar.url,
  });

  const createdUser = await User.findById(user._id).select("-password");

  return res
    .status(201)
    .json(new ApiResponse(201, createdUser, "User registered successfully"));
});



const login = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  if ((!username && !email) || !password) {
    throw new ApiError(400, "Credentials required");
  }

  const user = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (!user) {
    throw new ApiError(401, "Invalid credentials");
  }

  const isPasswordValid = await user.isPasswordCorrect(password);
  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid credentials");
  }

  const accessToken = await generateAccessToken(user._id);

  const loggedInUser = await User.findById(user._id).select("-password");

  return res.status(200).json(
    new ApiResponse(
      200,
      { user: loggedInUser, accessToken },
      "Login successful"
    )
  );
});



const logout = asyncHandler(async (req, res) => {
  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Logout successful"));
});



const getSingleUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, user, "User fetched successfully"));
});



const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find({}).select("-password");

  return res
    .status(200)
    .json(new ApiResponse(200, users, "All users fetched"));
});



const changeUserPassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  const user = await User.findById(req.user._id);
  const isValid = await user.isPasswordCorrect(oldPassword);

  if (!isValid) {
    throw new ApiError(401, "Old password is incorrect");
  }

  user.password = newPassword;
  await user.save();

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Password updated"));
});



const changeUserAvatar = asyncHandler(async (req, res) => {
  const avatarLocalPath = req.file?.path;
  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar is required");
  }

  const avatar = await uploadOnCloudinary(avatarLocalPath);
  if (!avatar?.url) {
    throw new ApiError(500, "Avatar upload failed");
  }

  const user = await User.findByIdAndUpdate(
    req.user._id,
    { avatar: avatar.url },
    { new: true }
  ).select("-password");

  return res
    .status(200)
    .json(new ApiResponse(200, user, "Avatar updated"));
});



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

  return res.status(200).json(
    new ApiResponse(
      200,
      { liked: !hasLiked, totalLikes: post.likes.length },
      "Like toggled"
    )
  );
});



export {
  registerUser,
  login,
  logout,
  getSingleUser,
  getAllUsers,
  changeUserPassword,
  changeUserAvatar,
  toggleLike,
};
