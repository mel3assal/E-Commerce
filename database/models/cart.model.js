import { model, Schema, Types } from "mongoose"

const cartSchema = new Schema({
    user:{type:Types.ObjectId,ref:'User'},
    cartItems:[{
        product:{type:Types.ObjectId,ref:'Product'},
        quantity:{type:Number,default:1},
        price:Number
    }],
    totalPrice:Number,
    discount:Number,
    totalPriceAfterDiscount:Number
}, { timestamps: true, versionKey: false })

export const Cart = model('Cart', cartSchema)