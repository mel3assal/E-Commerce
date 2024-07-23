import { model, Schema, Types } from "mongoose"
const productSchema = new Schema({
    title: {
        type: String,
        unique: [true, 'name must be unique'],
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
        minLength: 15,
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
productSchema.post('init',(doc)=>{
   if(doc.imageCover) doc.imageCover="http://localhost:3000/uploads/products/"+doc.imageCover
    if(doc.images)doc.images=doc.images.map((ele)=>"http://localhost:3000/uploads/products/"+ele)
})
export const Product = model('Product', productSchema)