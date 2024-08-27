import joi from 'joi'
const createCashOrderVal=joi.object({
        id:joi.string().hex().length(24),
        shippingAddress:joi.object({
            city: joi.string(), street: joi.string(), phone: joi.string()
        })  
})

export {createCashOrderVal}