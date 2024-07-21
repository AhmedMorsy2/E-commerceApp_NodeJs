import { User } from "../../Database/Models/user.model.js";
import { AppError } from "../utils/appError.js";
import { catchError } from "./catchError.js";

export const checkEmail = catchError(async (req, res, next) => {
  let isExist = await User.findOne({ email: req.body.email });
  if (isExist) return next(new AppError("Email already exist", 409));
  next();
});
