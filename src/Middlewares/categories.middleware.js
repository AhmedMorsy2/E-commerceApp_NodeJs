import { Category } from "../../Database/Models/category.model.js";
import { AppError } from "../utils/appError.js";
import { catchError } from "../utils/catchError.js";

const checkCategoryExist = catchError(async (req, res, next) => {
  let categories = await Category.find();
  categories.length === 0
    ? next(new AppError("There is no categories", 404))
    : next();
});

const checkIdExist = catchError(async (req, res, next) => {
  let category = await Category.findById(req.params.id);
  category || next(new AppError("There is no category with this ID", 404));
  !category || next();
});

export { checkCategoryExist, checkIdExist };
