import { model, Schema, Types } from "mongoose";

const couponSchema=new Schema({
    code:{
        type:String,
        unique:true,
        required:true
    },
    expires:Date,
    discount:Number

})
export const Coupon=model('Coupon',couponSchema)