import { model, Schema, Types } from "mongoose";

const orderSchema = new Schema(
  {
    user: { type: Types.ObjectId, ref: "User" },
    orderItems: [
      {
        product: { type: Types.ObjectId, ref: "Product" },
        quantity: Number,
        price: Number,
      },
    ],
    totalOrderPrice: Number,
    shippingAddress: { city: String, street: String, phone: String },
    paymentMethod: { type: String, enum: ["cash", "card"], default: "cash" },
    isPaid: { type: Boolean, default: false },
    paidAt: Date,
    isDelivered: { type: Boolean, default: true },
    deliveredAt: Date,
  },
  { timestamps: true, versionKey: false }
);

export const Order = model("Order", orderSchema);
