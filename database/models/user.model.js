import { model, Schema } from "mongoose";

const userSchma=new Schema({
    name:String,
    email:String,
    password:String,
    isBlocked:{
        type:Boolean,
        default:false
    },
    role:{
        type:String,
        enum:['admin','user'],
        default:'user'
    },

})
export const User=model('User',userSchma)