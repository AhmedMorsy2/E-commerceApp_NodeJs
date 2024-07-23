import slugify from "slugify";
import { Category } from "../../../Database/Models/category.model.js";
import { AppError } from "../../utils/appError.js";
import { deleteOne, getAll } from "../handlers/handler.js";
import { catchError } from "../../Middlewares/catchError.js";

const addCategory = catchError(async (req, res) => {
  req.body.slug = slugify(req.body.name);
  req.body.image = req.file.filename;
  let category = new Category(req.body);
  await category.save();
  res.status(200).json({ message: "Success", category });
});

const allCategories = getAll(Category);

const getCategory = catchError(async (req, res, next) => {
  let category = await Category.findById(req.params.id);
  category || next(new AppError("There is no category with this ID", 404));
  !category || res.status(200).json({ message: "Success", category });
});

const updateCategory = catchError(async (req, res, next) => {
  req.body.slug = slugify(req.body.name);
  if (req.file) req.body.image = req.file.filename;
  let category = await Category.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  category || next(new AppError("There is no category with this ID", 404));
  !category || res.status(200).json({ message: "Success", category });
});

const deleteCategory = deleteOne(Category);

export {
  addCategory,
  allCategories,
  getCategory,
  updateCategory,
  deleteCategory,
};
