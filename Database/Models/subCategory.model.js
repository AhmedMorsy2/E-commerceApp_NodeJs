import { Schema, Types, model } from "mongoose";

const schema = new Schema(
  {
    name: {
      type: String,
      unique: [true, "name must be unique"],
      required: true,
      trim: true,
      minLength: [2, "too short subCategory name"],
    },
    slug: {
      type: String,
      lowercase: true,
      required: true,
    },
    categoryID: {
      type: Types.ObjectId,
      ref: "Category",
    },
    createdBy: { type: Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const SubCategory = model("SubCategory", schema);
