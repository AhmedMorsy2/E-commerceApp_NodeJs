import slugify from "slugify";
import { Category } from "../../../Database/Models/category.model.js";
import { catchError } from "../../utils/catchError.js";
import { ApiFeature } from "../../utils/ApiFeatures.js";
import { AppError } from "../../utils/appError.js";

const addCategory = catchError(async (req, res) => {
  req.body.slug = slugify(req.body.name);
  console.log(req.file);
  req.body.image = req.file.filename;
  let category = new Category(req.body);
  await category.save();
  res.status(200).json({ message: "Success", category });
});

const allCategories = catchError(async (req, res, next) => {
  let apiFeatures = new ApiFeature(Category.find(), req.query)
    .pagination()
    .sort()
    .filter();
  let categories = await apiFeatures.mongooseQuery;

  res.status(200).json({
    message: "success",
    MetaData: {
      Page: apiFeatures.pageNumber,
      limit: apiFeatures.limit,
      total: categories.length,
    },
    categories,
  });
});

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
