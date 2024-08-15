import { Cart } from "../../../database/models/cart.model.js";
import { Product } from "../../../database/models/product.model.js";
import { catchError } from "../../middlewares/catchError.js";
import { AppError } from "../../utilis/AppError.js";
import { APIFeatures } from "./../../utilis/apiFeatures.js";
function calcTotalPrice(isExist) {
  isExist.totalPrice = isExist.cartItems.reduce(
    (prev, item) => (prev += item.quantity * item.price),
    0
  );
}
const addToCart = catchError(async (req, res, next) => {
  const isExist = await Cart.findOne({ user: req.user._id });
  const product = await Product.findById(req.body.product);
  if (!product) return next(new AppError(`product not found`, 404));
  req.body.price = product.price;
  if (req.body.quantity > product.stock)
    return next(new AppError(`Sold Out`, 404));
  if (!isExist) {
    const cart = new Cart({
      user: req.user._id,
      cartItems: [req.body],
    });
    calcTotalPrice(cart);
    await cart.save();
    res.status(201).json({ message: "cart created successfully", cart });
  } else {
    let item = isExist.cartItems.find(
      (item) => item.product == req.body.product
    );
    if (item) {
      item.quantity += req.body.quantity || 1;
    }
    if (item.quantity > product.stock)
      return next(new AppError(`Sold Out`, 404));
    if (!item) isExist.cartItems.push(req.body);
    calcTotalPrice(isExist);
    await isExist.save();
    res.json({ message: "sucess, cart updated", cart: isExist });
  }
});

const updateCart = catchError(async (req, res, next) => {
  let cart = await Cart.findOne({ user: req.user._id });
  if (!cart) return next(new AppError(`cart not found`, 404));
  let item = cart.cartItems.find((item) => item.product == req.params.id);
  if (!item) return next(new AppError(`item not found`, 404));
  item.quantity = req.body.quantity;
  calcTotalPrice(cart);
  await cart.save();
  res.json({ message: "quantity updated successfully", cart });
});

const removeItemFromCart=catchError(async(req,res,next)=>{
    let cart=await Cart.findOneAndUpdate({user:req.user._id},{$pull:{cartItems:{_id:req.params.id}}},{new:true})
    cart||next(new AppError(`cart not found`,404))
    calcTotalPrice(cart);
    await cart.save(); 
    res.json({message:"success",cart}) 
})
export { addToCart, updateCart ,removeItemFromCart};
