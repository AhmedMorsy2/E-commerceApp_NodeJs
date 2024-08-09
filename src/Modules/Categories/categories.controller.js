import slugify from "slugify";
import { Category } from "../../../Database/Models/category.model.js";
import { AppError } from "../../utils/appError.js";
import { deleteOne, getAll, getOne } from "../handlers/handler.js";
import { catchError } from "../../Middlewares/catchError.js";
import fs from "fs";
const addCategory = catchError(async (req, res) => {
  req.body.slug = slugify(req.body.name);
  req.body.image = req.file.filename;
  let category = new Category(req.body);
  await category.save();
  res.status(200).json({ message: "Success", category });
});

const allCategories = getAll(Category);

const getCategory = getOne(Category);

const updateCategory = catchError(async (req, res, next) => {
  req.body.slug = slugify(req.body.name);
  if (req.file) {
    let existCtegory = await Category.findById(req.params.id);
    let parts = existCtegory.image.split(
      `${req.protocol}://${req.get("host")}/`
    );
    const imageName = parts[parts.length - 1];
    fs.unlinkSync(imageName);
    req.body.image = req.file.filename;
  }
  let category = await Category.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  category || next(new AppError("There is no category with this ID", 404));
  !category || res.status(200).json({ message: "success", category });
});

const deleteCategory = catchError(async (req, res, next) => {
  let category = await Category.findById(req.params.id);
  if (!category) return next(new AppError("category not found", 404));
  let parts = category.image.split(`${req.protocol}://${req.get("host")}/`);
  const imageName = parts[parts.length - 1];
  fs.unlinkSync(imageName);
  await Category.findByIdAndDelete(req.params.id);
  res.status(200).json({ message: "success", category });
});

export {
  addCategory,
  allCategories,
  getCategory,
  updateCategory,
  deleteCategory,
};
