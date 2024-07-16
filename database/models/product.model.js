import { model, Schema, Types } from "mongoose"
const productSchema = new Schema({
    title: {
        type: String,
        unique: [true, 'name must be string'],
        trim: true,
        required: [true, 'name is required'],
        minLength: [3, 'categoery name is too short']
    },
    slug: {
        type: String,
        lowerCase: true,
        required: true,
        unique:true

    },
    description: {
        type: String,
        required: [true, 'description is required'],
        minLength: 30,
        maxLength: 3000
    },
    imageCover: String,
    images: [String],
    price: {
        type: Number,
        required: true,
        min: 0
    },
    sold: Number,
    stock: {
        type: Number,
        min: 0
    },
    Category: { type: Types.ObjectId, ref: 'Category' },
    brand: { type: Types.ObjectId, ref: 'Brand' },
    SubCategory: { type: Types.ObjectId, ref: 'SubCategory' },
    rateAvg:{type:Number,min:0,max:5},
    rateCount:Number,
    createdBy:{
        type:Types.ObjectId,
        ref:'User',
    }

}, { timestamps: true, versionKey: false })

export const Product = model('Product', productSchema)