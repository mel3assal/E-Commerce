import joi from 'joi'
const createCashOrderVal=joi.object({
    code:joi.string().required(),
    discount:joi.number().required(),
    expires:joi.date().required()
})

export {createCashOrderVal}