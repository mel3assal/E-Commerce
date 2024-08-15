import { Router } from "express";
import * as orderController from "./order.controller.js";
import { allowedTo, protectedRoutes } from "../auth/auth.controller.js";
const orderRouter = Router();
orderRouter
  .post(
    "/:id",
    protectedRoutes,
    allowedTo("user"),
    orderController.createCashOrder
  )
  .get(
    "/user",
    protectedRoutes,
    allowedTo("user",'admin'),
    orderController.getUserOrders
  )
  .get(
    "/",
    protectedRoutes,
    allowedTo("admin"),
    orderController.getAllOrders
  );

export default orderRouter;
