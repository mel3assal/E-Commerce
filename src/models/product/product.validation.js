import joi from 'joi'
const addProductVal=joi.object({
    title:joi.string().min(2).max(20).required(),
    description:joi.string().min(2).max(20).required(),
    createdBy:joi.string().hex().length(24).required(),
    category:joi.string().hex().length(24).required(),
    brand:joi.string().hex().length(24).required(),
    SubCategory:joi.string().hex().length(24).required(),
    rateAvg:joi.number().min(0).max(5),
    rateCount:joi.number(),
    imageCover:joi.object({
        fieldname:joi.string().required(),
        originalname:joi.string().required(),
        mimetype:joi.number().required()
    }).required(),
    images:joi.array(object({
        fieldname:joi.string().required(),
        originalname:joi.string().required(),
        mimetype:joi.number().required()
    })).required(),
    price:joi.number().min(0).required(),
    sold:joi.number().min(0),
    
})
const getAllCateoriesVal=joi.object({
})

const getProductVal=joi.object({
    id:joi.string().hex().length(24).required()
})
const updateProductVal=joi.object({
    name:joi.string().min(2).max(20),
    createdBy:joi.string().hex().length(24),
    category:joi.string().hex().length(24),
    logo:joi.object({
        fieldname:joi.string().required(),
        originalname:joi.string().required(),
        mimetype:joi.number().required()
    }),
    id:joi.string().hex().length(24)
})
const deleteProductval=joi.object({
    id:joi.string().hex().length(24).required()
})
export {addProductVal,getAllCateoriesVal,getProductVal,updateProductVal,deleteProductval}