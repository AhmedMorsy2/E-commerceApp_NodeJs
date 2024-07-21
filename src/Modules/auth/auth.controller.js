import { User } from "../../../Database/Models/user.model.js";
import { catchError } from "../../Middlewares/catchError.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { AppError } from "../../utils/appError.js";

const signup = catchError(async (req, res) => {
  let user = new User(req.body);
  await user.save();
  let token = jwt.sign({ useId: user._id, role: user.role }, "Morsy");
  res.status(200).json({ message: "success", token });
});

const signin = catchError(async (req, res, next) => {
  let user = await User.findOne({ email: req.body.email });
  if (user && bcrypt.compareSync(req.body.password, user.password)) {
    let token = jwt.sign({ useId: user._id, role: user.role }, "Morsy");
    return res.status(200).json({ message: "success", token });
  }
  next(new AppError("Incorrect email or password", 401));
});

export { signup, signin };
