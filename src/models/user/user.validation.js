import joi from 'joi'
const addUserVal=joi.object({
    name:joi.string().min(3).max(20).required(),
    email:joi.string().email().required(),
    password:joi.string().pattern(/^[A-Z][a-zA-Z0-9]{8,40}$/).required(),
    rePassword:joi.valid(joi.ref('password')).required(),
    recoveryEmail:joi.string().email(),
    mobileNumber:joi.string(),
    role:joi.string().pattern(/^(user|admin)$/)
})

const updateUserVal=joi.object({
    name:joi.string().min(3).max(20),
    email:joi.string().email(),
    recoveryEmail:joi.string().email(),
    mobileNumber:joi.string(),
    id:joi.string().hex().length(24).required()
})

const deleteUserVal=joi.object({
    id:joi.string().hex().length(24).required()
})

export {addUserVal,updateUserVal,deleteUserVal}