import joi from 'joi'
const addCartVal=joi.object({
    product:joi.string().hex().length(24).required(),
    quantity:joi.number(),
})
const getCartVal=joi.object({
    id:joi.string().hex().length(24).required(),
})
const updateCartVal=joi.object({
    quantity:joi.number(),
    id:joi.string().hex().length(24).required()
})
const removeCartItemVal=joi.object({
    id:joi.string().hex().length(24).required()
})
const applyCouponVal=joi.object({
    code:joi.string().required()
})
export {addCartVal,getCartVal,updateCartVal,removeCartItemVal,applyCouponVal}