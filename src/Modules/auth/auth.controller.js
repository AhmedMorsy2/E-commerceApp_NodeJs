import { User } from "../../../Database/Models/user.model.js";
import { catchError } from "../../Middlewares/catchError.js";
import { AppError } from "../../utils/appError.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const signup = catchError(async (req, res) => {
  let user = new User(req.body);
  await user.save();
  let token = jwt.sign(
    { userId: user._id, role: user.role, name: user.name, email: user.email },
    process.env.JWT_KEY
  );
  res.status(200).json({ message: "success", token });
});

const signin = catchError(async (req, res, next) => {
  let user = await User.findOne({ email: req.body.email });
  if (user && bcrypt.compareSync(req.body.password, user.password)) {
    let token = jwt.sign(
      { userId: user._id, role: user.role, name: user.name, email: user.email },
      process.env.JWT_KEY
    );
    return res.status(200).json({ message: "success", token });
  }
  next(new AppError("Incorrect email or password", 401));
});

const changeUserPassword = catchError(async (req, res, next) => {
  let user = await User.findById(req.user._id);
  if (user && bcrypt.compareSync(req.body.oldPassword, user.password)) {
    await User.findByIdAndUpdate(req.user._id, {
      password: req.body.newPassword,
      passwordChangedAt: Date.now(),
    });
    let token = jwt.sign(
      { userId: user._id, role: user.role, name: user.name, email: user.email },
      process.env.JWT_KEY
    );
    return res.status(200).json({ message: "success", token });
  }
  next(new AppError("Incorrect old password", 401));
});

const protectedRoutes = catchError(async (req, res, next) => {
  let { token } = req.headers;
  let userPayload = null;
  if (!token) return next(new AppError("Token not provided", 401));

  jwt.verify(token, process.env.JWT_KEY, (err, payload) => {
    if (err) return next(new AppError(err, 401));
    userPayload = payload;
  });

  let user = await User.findById(userPayload.userId);
  if (!user) next(new AppError("User not found", 401));

  if (user.passwordChangedAt && user.passwordChangedAt instanceof Date) {
    let time = parseInt(user.passwordChangedAt.getTime() / 1000);

    if (time > userPayload.iat) {
      return next(new AppError("Invalid token ... login again", 401));
    }
  }
  req.user = user;
  next();
});

const allowedTo = (...roles) => {
  return catchError(async (req, res, next) => {
    if (roles.includes(req.user.role)) return next();
    return next(
      new AppError("You are not authorized to access this end point", 401)
    );
  });
};
export { signup, signin, changeUserPassword, protectedRoutes, allowedTo };
