import { Router } from "express";
import  * as couponController from './coupon.controller.js'
import { validate } from './../../middlewares/validate.js';
import { allowedTo, protectedRoutes } from "../auth/auth.controller.js";
import { addCouponVal, getCouponVal, updateCouponVal } from './coupon.validation.js'
const couponRouter=Router()
couponRouter.use(protectedRoutes,allowedTo('admin'))
couponRouter.post('/',validate(addCouponVal),couponController.addCoupon).
get('/',couponController.getAllCoupons).
get('/:id',validate(getCouponVal),couponController.getCoupon).
put('/:id',validate(updateCouponVal),couponController.updateCoupon).
delete('/:id',validate(),couponController.deleteCoupon)

export default  couponRouter