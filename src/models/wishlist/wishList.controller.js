import { User } from '../../../database/models/user.model.js';
import { catchError } from '../../middlewares/catchError.js';
import { AppError } from '../../utilis/AppError.js';
const addWishList = catchError(async (req, res, next) => {
    const wishList = await User.findOneAndUpdate(req.user._id,{$addToSet:{wishList:req.body.product}},{new:true})
    wishList||next(new AppError('wishlist not found',404))
    !wishList||res.json({message:"success",wishList:wishList.wishList})
})

const removeFromWishList = catchError(async (req, res, next) => {
    const wishList = await User.findOneAndUpdate(req.user._id,{$pull:{wishList:req.params.id}},{new:true})
    wishList||next(new AppError('wishlist not found',404))
    !wishList||res.json({message:"success",wishList:wishList.wishList})
})

const getLoggedUserWishList = catchError(async (req, res, next) => {
    const wishList = await User.findById(req.user._id)
    wishList||next(new AppError('wishlist not found',404))
    !wishList||res.json({message:"success",wishList:wishList.wishList})
})
export {addWishList ,removeFromWishList,getLoggedUserWishList}