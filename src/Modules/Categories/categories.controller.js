import slugify from "slugify";
import { Category } from "../../../Database/Models/category.model.js";
import { catchError } from "../../utils/catchError.js";

const addCategory = catchError(async (req, res) => {
  req.body.slug = slugify(req.body.name);
  let category = new Category(req.body);
  await category.save();
  res.status(200).json({ message: "Success", categories });
});

const allCategories = catchError(async (req, res, next) => {
  let categories = await Category.find();
  categories.length === 0
    ? next(new AppError("There is no Categories", 404))
    : res.status(200).json({ message: "Success", categories });
});

const getCategory = catchError(async (req, res, next) => {
  let category = await Category.findById(req.params.id);
  category || next(new AppError("There is no category with this ID", 404));
  !category || res.status(200).json({ message: "Success", category });
});

const updateCategory = catchError(async (req, res, next) => {
  req.body.slug = slugify(req.body.name);
  let category = await Category.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  category || next(new AppError("There is no category with this ID", 404));
  !category || res.status(200).json({ message: "Success", category });
});

const deleteCategory = catchError(async (req, res, next) => {
  let category = await Category.findByIdAndDelete(req.params.id);
  category || next(new AppError("There is no category with this ID", 404));
  !category || res.status(200).json({ message: "Success", category });
});

export {
  addCategory,
  allCategories,
  getCategory,
  updateCategory,
  deleteCategory,
};
