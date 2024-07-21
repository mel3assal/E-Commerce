import joi from 'joi'
const addSubCategoryVal=joi.object({
    name:joi.string().min(2).max(20).required(),
    createdBy:joi.string().hex().length(24).required(),
    category:joi.string().hex().length(24).required(),
    image:joi.object({
        fieldname:joi.string().required(),
        originalname:joi.string().required(),
        encoding:joi.string().required(),
        mimetype:joi.number().required().valid('image/jpeg','image/png','image/jpg'),
        size:joi.number().required(),
        destination:joi.string().required(),
        filename:joi.string().required(),
        path:joi.string().required()
    }).required()
})
const getAllCateoriesVal=joi.object({
})

const getSubCategoryVal=joi.object({
    id:joi.string().hex().length(24).required()
})
const updateSubCategoryVal=joi.object({
    name:joi.string().min(2).max(20),
    createdBy:joi.string().hex().length(24),
    category:joi.string().hex().length(24),
    image:joi.object({
        fieldname:joi.string().required(),
        originalname:joi.string().required(),
        encoding:joi.string().required(),
        mimetype:joi.number().required().valid('image/jpeg','image/png','image/jpg'),
        size:joi.number().required(),
        destination:joi.string().required(),
        filename:joi.string().required(),
        path:joi.string().required()
    }),
    id:joi.string().hex().length(24)
})
const deleteSubCategoryval=joi.object({
    id:joi.string().hex().length(24).required()
})
export {addSubCategoryVal,getAllCateoriesVal,getSubCategoryVal,updateSubCategoryVal,deleteSubCategoryval}