import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    comment:{
        type:String,
        required:true
    },
    posted:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    }
})

export const Post = mongoose.model("Post",postSchema)