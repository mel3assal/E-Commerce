import { Cart } from "../../../database/models/cart.model.js";
import { Order } from "../../../database/models/order.model.js";
import { Product } from "../../../database/models/product.model.js";
import { catchError } from "../../middlewares/catchError.js";
import { AppError } from "../../utilis/AppError.js";
import { APIFeatures } from "./../../utilis/apiFeatures.js";
import Stripe from "stripe";
const stripe = new Stripe(
  "sk_test_51PqHrMCkjiKW5NT2vJHkqcVN0Np75is0jUJ4goIPDnAbxVkubOrj16p2J81dg1g00wS6GeSEiQdeSX5H0Roj2pjA00meREfhSB"
);
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
  await Product.bulkWrite(options);
  await Cart.findByIdAndDelete(cart._id);
  res.json({ message: "success", order });
});

const getUserOrders = catchError(async (req, res, next) => {
  let orders = Order.find({ user: req.user._id }).populate(
    "orderItems.product"
  );
  if (!orders) return next(new AppError(`no orders found`));
  res.json({ message: "success", orders });
});
const getAllOrders = catchError(async (req, res, next) => {
  let orders = Order.find().populate("orderItems.product");
  if (!orders) return next(new AppError(`no orders found`));
  res.json({ message: "success", orders });
});
const checkOutSession = catchError(async (req, res, next) => {
  let cart = await Cart.findById(req.params.id);
  if (!cart) return next(new AppError(`cart is not found`, 404));
  let totalOrderPrice = cart.totalPriceAfterDiscount || cart.totalPrice;
  let session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: "egp",
          unit_amount: totalOrderPrice * 100,
          product_data: { name: req.user.name },
        },
        quantity:1
      }
    ],
    mode:'payment',
    success_url:'https://www.google.com/',
    cancel_url:'https://www.yallakora.com/',
    customer_email:req.user.customer_email,
    client_reference_id:req.params.id,
    metadata:req.body.shippingAddress

  });
  res.json({message:"success",session})
});
export { createCashOrder, getUserOrders, getAllOrders,checkOutSession };
