import { model, Schema, Types } from "mongoose";

const schema = new Schema(
  {
    user: {
      type: Types.ObjectId,
      ref: "User",
    },
    orderItems: [
      {
        product: { type: Types.ObjectId, ref: "Product" },
        quantity: Number,
        price: Number,
      },
    ],
    totalCartPrice: Number,
    shippingAddress: {
      city: String,
      street: String,
      phone: String,
    },
    paymentType: {
      type: String,
      enum: ["cash", "card"],
      default: "cash",
    },
    isPaid: {
      type: Boolean,
      default: false,
    },
    paidAt: Date,
    isDelivered: {
      type: Boolean,
      default: false,
    },
    deliveredAt: Date,
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export const Order = model("Order", schema);
