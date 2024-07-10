import { User } from "../../Database/Models/user.model.js";
import { AppError } from "../utils/appError.js";
import { catchError } from "../utils/catchError.js";
import bcrypt from "bcrypt";

const emailExist = catchError(async (req, res, next) => {
  let emailFound = await User.findOne({ email: req.body.email });
  emailFound ? next(new AppError("Email already exist", 400)) : next();
});

const checkuser = catchError(async (req, res, next) => {
  let user = await User.findOne({ email: req.body.email });
  if (!user || !bcrypt.compareSync(req.body.password, user.password))
    return next(new AppError("Incorrect Email or Password", 401));
  next();
});

const checkUserExist = catchError(async (req, res, next) => {
  let user = await User.findOne({
    $or: [{ _id: req.params.id }, { _id: req.user.id }],
  });
  user || next(new AppError("There is no user with this ID", 404));
  !user || next();
});

export { emailExist, checkuser, checkUserExist };
