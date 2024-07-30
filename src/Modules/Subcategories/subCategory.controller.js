import slugify from "slugify";
import { SubCategory } from "../../../Database/Models/subCategory.model.js";
import { ApiFeature } from "../../utils/ApiFeatures.js";
import { AppError } from "../../utils/appError.js";
import { catchError } from "../../Middlewares/catchError.js";
import { deleteOne, getOne } from "../handlers/handler.js";

const addSubCategory = catchError(async (req, res) => {
  req.body.slug = slugify(req.body.name);
  let subCategory = new SubCategory(req.body);
  await subCategory.save();
  res.status(200).json({ message: "Success", subCategory });
});

const allSubCategories = catchError(async (req, res, next) => {
  let filter = {};
  if (req.params.category) filter.category = req.params.category;

  let apiFeatures = new ApiFeature(SubCategory.find(filter), req.query)
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

const getSubCategory = getOne(SubCategory);

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

const deleteSubCategory = deleteOne(SubCategory);

export {
  addSubCategory,
  allSubCategories,
  getSubCategory,
  updateSubCategory,
  deleteSubCategory,
};
