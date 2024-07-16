import { model, Schema, Types } from "mongoose"

const subCategorySchema = new Schema({
    name: {
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
    category: {
        type: Types.ObjectId,
        ref:"Category"
    },
    image: String,
    createdBy:{
        type:Types.ObjectId,
        ref:'User',
    }
}, { timestamps: true, versionKey: false })

export const SubCategory = model('SubCategory', subCategorySchema)