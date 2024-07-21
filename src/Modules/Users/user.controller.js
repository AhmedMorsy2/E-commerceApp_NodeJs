import { catchError } from "../../Middlewares/catchError.js";
import { AppError } from "../../utils/appError.js";
import { User } from "../../../Database/Models/user.model.js";
import { getAll } from "../handlers/handler.js";

const addUser = catchError(async (req, res) => {
  let user = new User(req.body);
  await user.save();
  res.status(200).json({ message: "Success", user });
});

const allUsers = getAll(User);

const getUser = catchError(async (req, res, next) => {
  let user = await User.findById(req.params.id);
  user || next(new AppError("User not found", 404));
  !user || res.status(200).json({ message: "Success", user });
});

const updateUser = catchError(async (req, res, next) => {
  let user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  user || next(new AppError("User not found", 404));
  !user || res.status(200).json({ message: "Success", user });
});

const deleteUser = catchError(async (req, res, next) => {
  let user = await User.findByIdAndDelete(req.params.id);
  user || next(new AppError("User not found", 404));
  !user || res.status(200).json({ message: "Success", user });
});

export { addUser, allUsers, updateUser, deleteUser, getUser };
