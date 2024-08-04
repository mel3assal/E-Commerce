import joi from 'joi'
const addWishListVal=joi.object({
    product:joi.string().hex().length(24).required()
})

const removeFromWishListVal=joi.object({
    product:joi.string().hex().length(24).required()
})

export {addWishListVal,removeFromWishListVal}