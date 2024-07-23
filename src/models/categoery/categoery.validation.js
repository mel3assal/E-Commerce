import joi from 'joi'
const addCategoryVal=joi.object({
    name:joi.string().min(3).max(20).required(),
    createdBy:joi.string().hex().length(24),
    file:joi.object({
        fieldname:joi.string().required(),
        originalname:joi.string().required(),
        encoding:joi.string().required(),
        mimetype:joi.string().required().valid('image/jpeg','image/png','image/jpg'),
        size:joi.number().required(),
        destination:joi.string().required(),
        filename:joi.string().required(),
        path:joi.string().required()
    }).required()
})

const getCategoryVal=joi.object({
    id:joi.string().hex().length(24).required()
})
const updateCategoryVal=joi.object({
    name:joi.string().min(2).max(20),
    createdBy:joi.string().hex().length(24),
    file:joi.object({
        fieldname:joi.string().required(),
        originalname:joi.string().required(),
        encoding:joi.string().required(),
        mimetype:joi.string().required().valid('image/jpeg','image/png','image/jpg'),
        size:joi.number().required(),
        destination:joi.string().required(),
        filename:joi.string().required(),
        path:joi.string().required()
    }),
    id:joi.string().hex().length(24).required()
})
const deleteCategoryval=joi.object({
    id:joi.string().hex().length(24).required()
})
export {addCategoryVal,getCategoryVal,updateCategoryVal,deleteCategoryval}