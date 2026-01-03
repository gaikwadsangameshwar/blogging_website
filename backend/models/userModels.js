import mongoose,{Schema} from "mongoose";
import bcrypt from "bcrypt"
import JWT from "jsonwebtoken"

const userSchema=new Schema(
    {
        username:{
            type:String,
            required:[true,"username is required"],
            trim:true,
            index:true,
            unique:true
        },
        email:{
            type:String,
            required:[true,"email is required"],
            trim:true,
            index:true,
            unirque:true
        },
        password:{
            type:String,
            required:[true,"Password is required"],
            trim:true
        },
        role: {
            type: String,
            enum: ["user", "admin"],
            default: "admin",
        },
        refreshToken: {
            type: String,
            select: false,
        },
        avatar:{
            type:String,
            required:true
        },
        likedPosts: [
            {
                type: Schema.Types.ObjectId,
                ref: "Post"
            }
        ]
    },
    {timestamps:true}
)

userSchema.pre("save",async function () {
    if(!this.isModified("password")) return;
    this.password=await bcrypt.hash(this.password,10)
})

userSchema.methods.isPasswordCorrect=async function (password) {
    return await bcrypt.compare(password,this.password)
}

userSchema.methods.generateAccessToken=function(){
    return JWT.sign(
        {
            _id:this._id,
            username:this.username,
            email:this.email,
            password:this.password
        },
        process.env.ACCESS_TOKEN_SECRET ,
        {
            expiresIn:process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

userSchema.methods.generateRefreshToken=function(){
    return JWT.sign(
        {
            _id:this._id,
        },
        process.env.REFRESH_TOKEN_SECRET ,
        {
            expiresIn:process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

export const User=mongoose.model("User",userSchema)