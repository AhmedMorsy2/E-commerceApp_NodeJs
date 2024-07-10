import { Schema, Types, model } from "mongoose";

const schema = new Schema(
  {
    code: {
      type: String,
      unique: true,
      required: true,
    },
    expiryDate: Date,
    discount: Number,
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const Coupon = model("Coupon", schema);
