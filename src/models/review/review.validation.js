import joi from 'joi'
const addReviewVal=joi.object({
    comment:joi.string().min(2).max(20).required(),
    product:joi.string().hex().length(24).required(),
    rate:joi.string().pattern(/^[1-5]$/).required()
})
const getReviewVal=joi.object({
    id:joi.string().hex().length(24).required()
})
const updateReviewVal=joi.object({
    comment:joi.string().min(2).max(20),
    product:joi.string().hex().length(24),
    rate:joi.string().pattern(/^[1-5]$/),
    id:joi.string().hex().length(24).required()
})
const deleteReviewVal=joi.object({
    id:joi.string().hex().length(24).required()
})
export {addReviewVal,getReviewVal,updateReviewVal,deleteReviewVal}