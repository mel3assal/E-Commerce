import { model, Schema, Types } from "mongoose";
import bcrypt from 'bcryptjs';

const userSchma = new Schema({
    name: String,
    email: String,
    password: String,
    isBlocked: {
        type: Boolean,
        default: false
    },
    confirmEmail: { type: Boolean, default: false },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    },
    passwordChangedAt:Date,    ////used for the change password token check
    wishList:[{type:Types.ObjectId,ref:"Product"}],
    addresses:[{city:String,phone:String,stree:String}]
})
userSchma.pre('save',function(){
    this.password=bcrypt.hashSync(this.password,8)
})

userSchma.pre('findOneAndUpdate',function(){
    if(this._update.password) this._update.password=bcrypt.hashSync(this._update.password,8)
})
export const User = model('User', userSchma)