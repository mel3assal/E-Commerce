import { Router } from "express";
import * as cartController from "./cart.controller.js";
import { validate } from "./../../middlewares/validate.js";
import { allowedTo, protectedRoutes } from "../auth/auth.controller.js";
import { addCartVal, applyCouponVal, removeCartItemVal, updateCartVal } from "./cart.validation.js";
const cartRouter = Router();
cartRouter
  .post("/", validate(addCartVal),protectedRoutes, allowedTo("user"), cartController.addToCart)
  .put("/:id", validate(updateCartVal),protectedRoutes, allowedTo("user"), cartController.updateCart)
  .delete(
    "/:id",
    validate(removeCartItemVal),
    protectedRoutes,
    allowedTo("user"),
    cartController.removeItemFromCart
  )
  .get(
    "/",
    protectedRoutes,
    allowedTo("user"),
    cartController.getLoggedUsercart
  )
  .delete("/",protectedRoutes, allowedTo("user"), cartController.clearCart)
  .post("/apply-coupon",validate(applyCouponVal), protectedRoutes, allowedTo("user"), cartController.applyCoupon);

export default cartRouter;
