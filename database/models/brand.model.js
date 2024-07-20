import { model, Schema, Types } from "mongoose"

const brandSchema = new Schema({
    name: {
        type: String,
        unique: [true, 'name must be string'],
        trim: true,
        required: [true, 'name is required'],
        minLength: [2, 'categoery name is too short']
    },
    slug: {
        type: String,
        lowerCase: true,
        required: true,
        unique:true
    },
    createdBy:{
        type:Types.ObjectId,
        ref:'User',
    },
    logo:String,
}, { timestamps: true, versionKey: false })
brandSchema.post('init',(doc)=>{
    doc.logo="http://localhost:3000/uploads/brands/"+doc.logo
})

export const Brand = model('Brand', brandSchema)