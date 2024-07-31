import { AppError } from "../utilis/AppError.js"
import { User } from './../../database/models/user.model.js';
const checkEmail = async (req, res, next) => {
    const isFound = await User.findOne({ email: req.body.email })
    if (isFound) return next(new AppError('user already exist',408))
    next()
}
export default checkEmail
