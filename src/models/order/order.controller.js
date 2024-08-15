import { Cart } from "../../../database/models/cart.model.js";
import { Order } from "../../../database/models/order.model.js";
import { Product } from "../../../database/models/product.model.js";
import { catchError } from "../../middlewares/catchError.js";
import { AppError } from "../../utilis/AppError.js";
import { APIFeatures } from "./../../utilis/apiFeatures.js";
const createCashOrder = catchError(async (req, res, next) => {
  let cart = await Cart.findById(req.params.id);
  if (!cart) return next(new AppError(`cart is not found`, 404));
  let totalOrderPrice = cart.totalPriceAfterDiscount || cart.totalPrice;
  let order = new Order({
    user: req.user._id,
    orderItems: cart.cartItems,
    shippingAddress: req.body.shippingAddress,
    totalOrderPrice: totalOrderPrice,
  });
  await order.save();
  let options = order.orderItems.map((prod) => {
    return {
      updateOne: {
        filter: { _id: prod.product },
        update: { $inc: { sold: prod.quantity, stock: -prod.quantity } },
      },
    };
  });
  await Product.bulkWrite(options)
  await Cart.findByIdAndDelete(cart._id)
  res.json({ message: "success", order });
});

const getUserOrders=catchError(async(req,res,next)=>{
      let orders=Order.find({user:req.user._id}).populate('orderItems.product')
      if(!orders)return next(new AppError(`no orders found`))
      res.json({message:"success",orders})
})
const getAllOrders=catchError(async(req,res,next)=>{
  let orders=Order.find().populate('orderItems.product')
  if(!orders)return next(new AppError(`no orders found`))
  res.json({message:"success",orders})
})
export { createCashOrder,getUserOrders,getAllOrders };
