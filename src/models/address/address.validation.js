import joi from 'joi'
const addAddressesVal=joi.object({
    city:joi.string().required(),
    phone:joi.string().required(),
    street:joi.string().required()
})

const removeAddressesVal=joi.object({
    id:joi.string().hex().length(24).required()
})

export {addAddressesVal,removeAddressesVal}