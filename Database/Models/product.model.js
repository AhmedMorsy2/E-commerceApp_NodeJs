import { Schema, Types, model } from "mongoose";

const schema = new Schema(
  {
    title: {
      type: String,
      required: true,
      minLength: [1, "too short Product title"],
    },
    slug: {
      type: String,
      lowercase: true,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    imageCover: String,
    images: [String],
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    priceAfterDiscount: {
      type: Number,
      min: 0,
    },
    sold: Number,
    stock: {
      type: Number,
      min: 0,
    },
    category: {
      type: Types.ObjectId,
      ref: "Category",
    },
    subcategory: {
      type: Types.ObjectId,
      ref: "SubCategory",
    },
    brand: {
      type: Types.ObjectId,
      ref: "Brand",
    },
    rateAvg: {
      type: Number,
      min: 0,
      max: 5,
    },
    rateCount: Number,
    createdBy: { type: Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

schema.post("init", function (doc) {
  if (doc.imageCover) doc.imageCover = process.env.BASE_URL + "products/" + doc.imageCover;
  if (doc.images) doc.images = doc.images.map(img => process.env.BASE_URL + "products/" + img);
});

export const Product = model("Product", schema);
