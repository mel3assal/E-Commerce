import joi from 'joi'
const addCartVal=joi.object({
    code:joi.string().required(),
    discount:joi.number().required(),
    expires:joi.date().required()
})
const getCartVal=joi.object({
    id:joi.string().hex().length(24).required()
})
const updateCartVal=joi.object({
    name:joi.string().min(2).max(20),
    createdBy:joi.string().hex().length(24)
})
const deleteCartVal=joi.object({
    id:joi.string().hex().length(24).required()
})
export {addCartVal,getCartVal,updateCartVal,deleteCartVal}