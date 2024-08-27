process.on("uncaughtException", (err) => {
  console.log("error", err);
});
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { dbConnection } from "./database/dbConnection.js";
import bootstrap from "./bootstrap.js";
import { catchError } from "./src/middlewares/catchError.js";
import { Cart } from "./database/models/cart.model.js";
import { Order } from "./database/models/order.model.js";
import { User } from "./database/models/user.model.js";
import Stripe from "stripe";
const stripe = new Stripe(
  "sk_test_51PqHrMCkjiKW5NT2vJHkqcVN0Np75is0jUJ4goIPDnAbxVkubOrj16p2J81dg1g00wS6GeSEiQdeSX5H0Roj2pjA00meREfhSB"
);
const endpointSecret = "whsec_e765ssBEIcvxQXi6CEsrSw2YdV3ezHAZ";
const app = express();
const port = process.env.port || 3000;
app.use(cors());
app.use("/uploads", express.static("uploads"));
bootstrap(express, app);
app.get("/", (req, res) => res.send("Hello World!"));
app.listen(port, () => console.log(`app  listening on port   ${port}!`));
dotenv.config();


//payment End point
app.post(
  "/api/webhook",
  express.raw({ type: "application/json" }),
  catchError(async (req, res) => {
    const signature = req.headers["stripe-signature"].toString();
    let event = stripe.webhooks.constructEvent(
      req.body,
      signature,
      endpointSecret
    );

    let checkout;
    if (event.type == "checkout.session.completed") {
      const checkout = event.data.object;
    }

    let cart = await Cart.findById(checkout.client_reference_id);
    if (!cart) return next(new AppError(`cart is not found`, 404));
    let user = await User.findOne({ email: checkout.customer_email });
    let order = new Order({
      user: user._id,
      orderItems: cart.cartItems,
      shippingAddress: checkout.metadata,
      totalOrderPrice: checkout.amount_total / 100,
      paymentMethod: "card",
      isPaid: true,
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
    res.json({ message: "success", checkout });
  })
);

process.on("unhandledRejection", (err) => {
  console.log("error", err);
});



//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NmNkYmQ1MzIzNjk5NzUzN2Y5MGQ5YzQiLCJyb2xlIjoidXNlciIsImlhdCI6MTcyNDc1OTM4MH0.f4GFAkRNCBIRYr8LguV54yv_G3tTGFLg_oAnKqg23Bg