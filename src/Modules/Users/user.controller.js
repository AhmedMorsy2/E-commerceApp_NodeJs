import { catchError } from "../../utils/catchError.js";
import { AppError } from "../../utils/appError.js";
import { ApiFeature } from "../../utils/ApiFeatures.js";
import { User } from "../../../Database/Models/user.model.js";

const addUser = catchError(async (req, res) => {
  let user = new User(req.body);
  await user.save();
  res.status(200).json({ message: "Success", user });
});

const allUsers = catchError(async (req, res, next) => {
  let apiFeatures = new ApiFeature(User.find(), req.query)
    .pagination()
    .sort()
    .filter()
    .fields()
    .search();
  let users = await apiFeatures.mongooseQuery;

  res.status(200).json({
    message: "success",
    MetaData: {
      Page: apiFeatures.pageNumber,
      limit: apiFeatures.limit,
      total: users.length,
    },
    users,
  });
});

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
