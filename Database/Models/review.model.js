import { Schema, Types, model } from "mongoose";

const schema = new Schema(
  {
    comment: String,
    user: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },
    product: {
      type: Types.ObjectId,
      ref: "Product",
      required: true,
    },
    rate: {
      type: Number,
      min: 0,
      max: 5,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const Review = model("Review", schema);
