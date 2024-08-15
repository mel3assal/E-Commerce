import { Coupon } from '../../../database/models/coupon.model.js';
import { catchError } from '../../middlewares/catchError.js';
import { AppError } from '../../utilis/AppError.js';
import { APIFeatures } from './../../utilis/apiFeatures.js';
const addCoupon = catchError(async (req, res, next) => {
    const isExist=await Coupon.findOne({code:req.body.code})
    if(isExist) return next(new AppError('coupon already exist',409))
    const coupon = await Coupon.create(req.body)
    coupon.save()
    res.status(201).json({ message: "Coupon created successfully", coupon })
})

const getAllCoupons = catchError(async (req, res, next) => {
    let apiFeatures=new APIFeatures(Coupon.find(),req.query).pagination().search().fields().filter().sort()
    let Coupons=await apiFeatures.mongooseQuery
    if (!Coupons) return next(new AppError('no subcategories found', 404))
    res.status(200).json({ message: "Coupons are", Coupons })
})

const getCoupon = catchError(async (req, res, next) => {
    const coupon = await Coupon.findById(req.params.id)
    if (!coupon) return next(new AppError('Coupon not found', 404))
    res.status(200).json({ message: "Coupon is", coupon })
})
const updateCoupon = catchError(async (req, res, next) => {
    const coupon = await Coupon.findById(req.params.id)
    if (!coupon) return next(new AppError('Coupon not found', 404))
    await coupon.updateOne(req.body)
    res.status(200).json({ message: "Coupon updated Successfully", coupon })
})

const deleteCoupon = catchError(async (req, res, next) => {
    const coupon = await Coupon.findById({ _id: req.params.id })
    if (!coupon) return next(new AppError('Coupon not found', 404))
    await coupon.deleteOne()
    res.json({ message: "Coupon delted successfully", coupon })
})
export { addCoupon, getAllCoupons, getCoupon, updateCoupon, deleteCoupon }