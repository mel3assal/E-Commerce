import { Router } from "express";
import  * as reviewController from './review.controller.js'
import { validate } from './../../middlewares/validate.js';
import { allowedTo, protectedRoutes } from "../auth/auth.controller.js";
import { addReviewVal, deleteReviewVal, getReviewVal, updateReviewVal } from "./review.validation.js";
const ReviewRouter=Router()
ReviewRouter.post('/',protectedRoutes,allowedTo('user'),validate(addReviewVal),reviewController.addReview).
get('/',reviewController.getAllReviews).
get('/:id',validate(getReviewVal),reviewController.getReview).
put('/:id',protectedRoutes,allowedTo('user'),validate(updateReviewVal),reviewController.updateReview).
delete('/:id',protectedRoutes,allowedTo('user','admin'),validate(deleteReviewVal),reviewController.deleteReview)
export default  ReviewRouter