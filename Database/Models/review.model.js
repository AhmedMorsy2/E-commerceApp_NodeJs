import { Schema, Types, model } from "mongoose";

const schema = new Schema(
  {
    comment: String,
    user: {
      type: Types.ObjectId,
      ref: "User",
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
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// schema.pre(/^find/, function () {
//   this.populate("user", "name");
//   this.populate("product");
// });

export const Review = model("Review", schema);
