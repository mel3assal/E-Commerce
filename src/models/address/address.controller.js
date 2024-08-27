import { User } from '../../../database/models/user.model.js';
import { catchError } from '../../middlewares/catchError.js';
import { AppError } from '../../utilis/AppError.js';
const addAddress = catchError(async (req, res, next) => {
    const Address = await User.findByIdAndUpdate(req.user._id,{$push:{addresses:req.body}},{new:true})
    Address||next(new AppError('Address not found',404))
    !Address||res.json({message:"success",Address:Address.addresses})
})

const removeFromAddress = catchError(async (req, res, next) => {
    const Address = await User.findByIdAndUpdate(req.user._id,{$pull:{addresses:{_id:req.params.id}}},{new:true})    
    Address||next(new AppError('Address not found',404))
    !Address||res.json({message:"success",Address:Address.addresses})
})

const getLoggedUserAddress = catchError(async (req, res, next) => {
    const Address = await User.findById(req.user._id)
    Address||next(new AppError('Address not found',404))
    !Address||res.json({message:"success",Address:Address.addresses})
})
export {addAddress ,removeFromAddress,getLoggedUserAddress}