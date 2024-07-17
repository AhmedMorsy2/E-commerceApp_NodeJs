import slugify from "slugify";
import { SubCategory } from "../../../Database/Models/subCategory.model.js";
import { catchError } from "../../utils/catchError.js";
import { ApiFeature } from "../../utils/ApiFeatures.js";

const addSubCategory = catchError(async (req, res) => {
  req.body.slug = slugify(req.body.name);
  let subCategory = new SubCategory(req.body);
  await subCategory.save();
  res.status(200).json({ message: "Success", subCategories });
});

const allSubCategories = catchError(async (req, res, next) => {
  let apiFeatures = new ApiFeature(SubCategory.find(), req.query)
    .pagination()
    .sort()
    .filter()
    .fields()
    .search();
  let subCategories = await apiFeatures.mongooseQuery;
  res.status(200).json({
    message: "success",
    MetaData: {
      Page: apiFeatures.pageNumber,
      limit: apiFeatures.limit,
      total: subCategories.length,
    },
    subCategories,
  });
});

const getSubCategory = catchError(async (req, res, next) => {
  let subCategory = await SubCategory.findById(req.params.id);
  subCategory ||
    next(new AppError("There is no subCategory with this ID", 404));
  !subCategory || res.status(200).json({ message: "Success", subCategory });
});

const updateSubCategory = catchError(async (req, res, next) => {
  req.body.slug = slugify(req.body.name);
  let subCategory = await SubCategory.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  subCategory ||
    next(new AppError("There is no subCategory with this ID", 404));
  !subCategory || res.status(200).json({ message: "Success", subCategory });
});

const deleteSubCategory = catchError(async (req, res, next) => {
  let subCategory = await SubCategory.findByIdAndDelete(req.params.id);
  subCategory ||
    next(new AppError("There is no subCategory with this ID", 404));
  !subCategory || res.status(200).json({ message: "Success", subCategory });
});

export {
  addSubCategory,
  allSubCategories,
  getSubCategory,
  updateSubCategory,
  deleteSubCategory,
};
