import { catchError } from '../../middlewares/catchError.js';
import { AppError } from '../../utilis/AppError.js';
import { APIFeatures } from './../../utilis/apiFeatures.js';
import { Review } from './../../../database/models/review.model.js';
const addReview = catchError(async (req, res, next) => {
    req.body.user=req.user._id
    let isExist=await Review.findOne({user:req.user._id,product:req.product})
    if(isExist) return next(new AppError('you created review before',409 ))
    const review = await Review.create(req.body)
    await  review.save()
    res.status(201).json({ message: "review created successfully", review })
})

const getAllReviews = catchError(async (req, res, next) => {
    let apiFeatures=new APIFeatures(Review.find(),req.query).pagination().search().fields().filter().sort()
    let reviews=await apiFeatures.mongooseQuery
    if (!reviews) return next(new AppError('no reviews found', 404))
    res.status(200).json({ message: "reviews are", reviews })
})

const getReview = catchError(async (req, res, next) => {
    const review = await Review.findById(req.params.id)
    if (!review) return next(new AppError('review not found', 404))
    res.status(200).json({ message: "review is", review })
})
const updateReview = catchError(async (req, res, next) => {
    const review = await Review.findById(req.params.id)
    if (!review) return next(new AppError('review not found', 404))
    if(review.user!=req.user._id) return next(new AppError('you are not authorized to updat that review',401))
    await review.updateOne(req.body)
    res.status(200).json({ message: "review updated Successfully", review })
})

const deleteReview = catchError(async (req, res, next) => {
    const review = await Review.findById({ _id: req.params.id })
    if (!review) return next(new AppError('review not found', 404))
    await review.deleteOne()
    res.json({ message: "review delted successfully", review })
})
export { addReview, getAllReviews, getReview, updateReview, deleteReview }