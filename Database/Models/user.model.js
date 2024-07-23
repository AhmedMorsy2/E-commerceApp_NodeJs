import { Schema, Types, model } from "mongoose";
import bcrypt from "bcrypt";
const schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
    consfirmEmail: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    passwordChangedAt: Date,
    wishList: [{ type: Types.ObjectId, ref: "Product" }],
    addresses: [
      {
        city: String,
        phone: String,
        street: String,
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
    id: false,
  }
);

schema.pre("save", function () {
  this.password = bcrypt.hashSync(this.password, 8);
});

schema.pre("findOneAndUpdate", function () {
  if (this._update.password)
    this._update.password = bcrypt.hashSync(this._update.password, 8);
});

export const User = model("User", schema);
