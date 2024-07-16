import { model, Schema, Types } from "mongoose";

const reviewSchema=new Schema({
    comment:String,
    user:{
        type:Types.ObjectId,
        ref:"User",
        required:true
    },
    rate:{
        type:Number,
        min:0,
        max:5,
        required:true
    },
    product:{
        type:Types.ObjectId,
        ref:"Product",
        required:true
    }
})
export const Review=model('Review',reviewSchema)