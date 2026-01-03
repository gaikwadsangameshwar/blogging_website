import mongoose, { Schema } from "mongoose";

const postSchema=new Schema({
        title:{
            type:String,
            required:[true,"The Title is required"],
            unique:true,
            trim:true,
            index:true
        },
        context: {
            type: String,
            required: [true, "The Description is required"],
            minlength: [10, "Description must be at least 10 characters"],
            maxlength: [300, "Description must be at most 300 characters"],
            index: true
        },
        thumbnail:{
            type:String,
            required:true
        },
        author:{
            type:Schema.Types.ObjectId,
            ref:"User"
        },
        category:{
            type:String,
            required:true
        },
        status:{
            type: String,
            enum: ["default", "isPublished"],
            default: "isPublished"
        },
        likes:[
            {
            type: Schema.Types.ObjectId,
            ref: "User"
            }
        ],
        isDeleted:{
            type:Boolean,
            required:false
        }
    },
    {
        timestamps:true
    }
)

export const Post=mongoose.model("Post",postSchema)
