import mongoose,{Schema} from "mongoose";

const userSchema=new Schema(
    {
        username:{
            types:String,
            required:[true,"username is required"],
            trim:true,
            index:true,
            unique:true
        },
        email:{
            types:String,
            required:[true,"email is required"],
            trim:true,
            index:true,
            unirque:true
        },
        password:{
            types:String,
            required:[true,"Password is required"],
            trim:true
        },
        role: {
            type: String,
            enum: ["user", "admin"],
            default: "user",
        },
        refreshToken: {
            type: String,
            select: false,
        }
    },
    {timestamps:true}
)

export const User=mongoose.model("User",userSchema)