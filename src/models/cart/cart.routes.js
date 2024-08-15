import { Router } from "express";
import * as cartController from "./cart.controller.js";
import { validate } from "./../../middlewares/validate.js";
import { allowedTo, protectedRoutes } from "../auth/auth.controller.js";
const cartRouter = Router();
cartRouter
  .post("/", protectedRoutes, allowedTo("user"), cartController.addToCart)
  .put("/:id", protectedRoutes, allowedTo("user"), cartController.updateCart)
  .delete("/:id", protectedRoutes, allowedTo("user"), cartController.removeItemFromCart);

export default cartRouter;
