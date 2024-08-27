import joi from 'joi'
const addProductVal = joi.object({
    title: joi.string().min(2).max(20).required(),
    description: joi.string().min(2).max(40).required(),
    createdBy: joi.string().hex().length(24).required(),
    category: joi.string().hex().length(24).required(),
    brand: joi.string().hex().length(24).required(),
    subCategory: joi.string().hex().length(24).required(),
    rateAvg: joi.number().min(0).max(5),
    rateCount: joi.number(),
    files: joi.object({
        imageCover: joi.array().items(joi.object({
            fieldname: joi.string().required(),
            originalname: joi.string().required(),
            encoding: joi.string().required(),
            mimetype: joi.number().required().valid('image/jpeg', 'image/png', 'image/jpg'),
            size: joi.number().required(),
            destination: joi.string().required(),
            filename: joi.string().required(),
            path: joi.string().required()
        })).required(),
        images: joi.array().items(joi.object({
            fieldname: joi.string().required(),
            originalname: joi.string().required(),
            encoding: joi.string().required(),
            mimetype: joi.number().required().valid('image/jpeg', 'image/png', 'image/jpg'),
            size: joi.number().required(),
            destination: joi.string().required(),
            filename: joi.string().required(),
            path: joi.string().required()
        })).required()
    }).required(),
    price: joi.number().min(0).required(),
    sold: joi.number().min(0),

})
const getProductVal = joi.object({
    id: joi.string().hex().length(24).required()
})
const updateProductVal = joi.object({
    title: joi.string().min(2).max(20),
    description: joi.string().min(2).max(40),
    createdBy: joi.string().hex().length(24),
    category: joi.string().hex().length(24),
    brand: joi.string().hex().length(24),
    subCategory: joi.string().hex().length(24),
    rateAvg: joi.number().min(0).max(5),
    rateCount: joi.number(),
    files: joi.object({
        imageCover: joi.array().items(joi.object({
            fieldname: joi.string().required(),
            originalname: joi.string().required(),
            encoding: joi.string().required(),
            mimetype: joi.number().required().valid('image/jpeg', 'image/png', 'image/jpg'),
            size: joi.number().required(),
            destination: joi.string().required(),
            filename: joi.string().required(),
            path: joi.string().required()
        })),
        images: joi.array().items(joi.object({
            fieldname: joi.string().required(),
            originalname: joi.string().required(),
            encoding: joi.string().required(),
            mimetype: joi.number().required().valid('image/jpeg', 'image/png', 'image/jpg'),
            size: joi.number().required(),
            destination: joi.string().required(),
            filename: joi.string().required(),
            path: joi.string().required()
        }))
    }),
    price: joi.number().min(0),
    sold: joi.number().min(0),
    id: joi.string().hex().length(24).required()
})
const deleteProductval = joi.object({
    id: joi.string().hex().length(24).required()
})
export { addProductVal, getProductVal, updateProductVal, deleteProductval }