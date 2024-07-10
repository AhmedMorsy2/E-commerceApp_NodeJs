import { User } from "../../../Database/Models/user.model.js";
import { catchError } from "../../utils/catchError.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const signUp = catchError(async (req, res) => {
  req.body.password = bcrypt.hashSync(req.body.password, 8);
  let user = new User(req.body);
  await user.save();
  user.password = undefined;
  res.status(200).json({ message: "Success", user });
});

const signin = catchError(async (req, res) => {
  let user = await User.findOne({ email: req.body.email });
  jwt.sign(
    { email: user.email, id: user._id, role: user.role },
    "MorsyAboelgoud",
    (err, token) => {
      res.status(200).json({ message: "Success", token });
    }
  );
});

const updateUser = catchError(async (req, res) => {
  let user = await User.findByIdAndUpdate(req.user.id, req.body, { new: true });
  res.status(200).json({ message: "Success", user });
});

const getUserProfile = catchError(async (req, res) => {
  let user = await User.findById(req.user.id);
  res.status(200).json({ message: "Success", user });
});

const deleteProfile = catchError(async (req, res) => {
  let user = await User.findByIdAndDelete(req.user.id);
  res.status(200).json({ message: "Success", user });
});

const getOtherUserProfile = catchError(async (req, res) => {
  let user = await User.findById(req.params.id);
  res.status(200).json({ message: "Success", user });
});

export {
  signUp,
  signin,
  updateUser,
  getUserProfile,
  deleteProfile,
  getOtherUserProfile,
};
