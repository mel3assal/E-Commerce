import joi from 'joi'
const addBrandVal=joi.object({
    name:joi.string().min(2).max(20).required(),
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
// const getAllBrandsVal=joi.object({
//     page:joi.string(),
//     search:joi.string(),
//     sort:joi.string(),
//     fields:joi.string(),
//     filter:joi.string()
// })

const getBrandVal=joi.object({
    id:joi.string().hex().length(24).required()
})
const updateBrandVal=joi.object({
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
    }).required(),
    id:joi.string().hex().length(24)
})
const deleteBrandVal=joi.object({
    id:joi.string().hex().length(24).required()
})
export {addBrandVal,getBrandVal,updateBrandVal,deleteBrandVal}