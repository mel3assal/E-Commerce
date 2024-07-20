import joi from 'joi'
const addCategoryVal=joi.object({
    name:joi.string().min(2).max(20).required(),
    createdBy:joi.string().hex().length(24).required(),
    image:joi.object({
        fieldname:joi.string().required(),
        originalname:joi.string().required(),
        mimetype:joi.number().required()
    }).required()
})
const getAllCateoriesVal=joi.object({
})

const getCategoryVal=joi.object({
    id:joi.string().hex().length(24).required()
})
const updateCategoryVal=joi.object({
    name:joi.string().min(2).max(20),
    createdBy:joi.string().hex().length(24),
    logo:joi.object({
        fieldname:joi.string().required(),
        originalname:joi.string().required(),
        mimetype:joi.number().required()
    }),
    id:joi.string().hex().length(24)
})
const deleteCategoryval=joi.object({
    id:joi.string().hex().length(24).required()
})
export {addCategoryVal,getAllCateoriesVal,getCategoryVal,updateCategoryVal,deleteCategoryval}