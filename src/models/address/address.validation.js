import joi from 'joi'
const addAddressesVal=joi.object({
    id:joi.string().hex().length(24).required()
})

const removeAddressesVal=joi.object({
    id:joi.string().hex().length(24).required()
})

export {addAddressesVal,removeAddressesVal}