import { SubCategory } from "../../Database/Models/subCategory.model.js";
import { AppError } from "../utils/appError.js";
import { catchError } from "../utils/catchError.js";

const checkSubcategoryExist = catchError(async (req, res, next) => {
  let subCategories = await SubCategory.find();
  subCategories.length === 0
    ? next(new AppError("There is no subCategories", 404))
    : next();
});

const checkSubcategoryIdExist = catchError(async (req, res, next) => {
  let subCategory = await SubCategory.findById(req.params.id);
  subCategory ||
    next(new AppError("There is no subCategory with this ID", 404));
  !subCategory || next();
});

export { checkSubcategoryExist, checkSubcategoryIdExist };
