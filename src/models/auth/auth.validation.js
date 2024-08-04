import joi from 'joi'
const signUpVal=joi.object({
    name:joi.string().min(3).max(20).required(),
    email:joi.string().email().required(),
    password:joi.string().pattern(/^[A-Z][a-zA-Z0-9]{8,40}$/).required(),
    rePassword:joi.valid(joi.ref('password')).required(),
    recoveryEmail:joi.string().email(),
    mobileNumber:joi.string(),
    role:joi.string().pattern(/^(user|admin)$/)
})

const signInVal=joi.object({
    email:joi.string().email(),
    password:joi.string().pattern(/^[A-Z][a-zA-Z0-9]{8,40}$/).required()
})

const changePasswordVal=joi.object({
    oldPassword:joi.string().pattern(/^[A-Z][a-zA-Z0-9]{8,40}$/).required(),
    newPassword:joi.string().pattern(/^[A-Z][a-zA-Z0-9]{8,40}$/).required(),
    rePasword:joi.valid(joi.ref('newPassword')).required()
})
export {signUpVal,signInVal,changePasswordVal}