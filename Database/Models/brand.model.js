import { Schema, Types, model } from "mongoose";

const schema = new Schema(
  {
    name: {
      type: String,
      unique: [true, "name is required"],
      required: true,
      trim: true,
      minLength: [2, "too short Brand name"],
    },
    slug: {
      type: String,
      lowercase: true,
      required: true,
    },
    logo: String,
    createdBy: {
      type: Types.ObjectId,
      ref: "Category",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

schema.post("init", function (doc) {
  doc.logo = "http://localhost:3000/uploads/brands/" + doc.logo;
});

export const Brand = model("Brand", schema);
