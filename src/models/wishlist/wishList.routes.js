import { Router } from "express";
import  * as wishListController from './wishList.controller.js'
import { validate } from './../../middlewares/validate.js';
import { allowedTo, protectedRoutes } from "../auth/auth.controller.js";
import { addWishListVal, removeFromWishListVal } from "./wishList.validation.js";
const wishListRouter=Router()
wishListRouter.post('/',protectedRoutes,allowedTo('user'),validate(addWishListVal),wishListController.addWishList).
delete('/:id',protectedRoutes,allowedTo('user'),validate(removeFromWishListVal),wishListController.removeFromWishList).
get('/',protectedRoutes,allowedTo('user'),wishListController.getLoggedUserWishList)
export default  wishListRouter