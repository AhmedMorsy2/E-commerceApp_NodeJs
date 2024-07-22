import { Schema, Types, model } from "mongoose";

const schema = new Schema(
  {
    name: {
      type: String,
      unique: [true, "name is required"],
      required: true,
      trim: true,
      minLength: [2, "too short category name"],
    },
    slug: {
      type: String,
      lowercase: true,
      required: true,
    },
    image: String,
    createdBy: { type: Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

schema.post("init", function (doc) {
  if (doc.image) doc.image = process.env.BASE_URL + "categories/" + doc.image;
});

export const Category = model("Category", schema);
