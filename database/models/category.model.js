import { model, Schema, Types } from "mongoose"

const categorySchema = new Schema({
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
    createdBy:{
        type:Types.ObjectId,
        ref:'User',
    },
    image: String
}, { timestamps: true, versionKey: false })
categorySchema.post('init',function(doc){
    doc.image="http://localhost:3000/uploads/categories/"+doc.image
})
export const Category=model('Category',categorySchema)