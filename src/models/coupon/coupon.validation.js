import joi from 'joi'
const addCouponVal=joi.object({
    code:joi.string().required(),
    discount:joi.number().required(),
    expires:joi.date().required()
})
const getCouponVal=joi.object({
    id:joi.string().hex().length(24).required()
})
const updateCouponVal=joi.object({
    name:joi.string().min(2).max(20),
    createdBy:joi.string().hex().length(24)
})
const deleteCouponVal=joi.object({
    id:joi.string().hex().length(24).required()
})
export {addCouponVal,getCouponVal,updateCouponVal,deleteCouponVal}