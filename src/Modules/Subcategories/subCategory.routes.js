import { Router } from "express";
import {
  addSubCategory,
  allSubCategories,
  deleteSubCategory,
  getSubCategory,
  updateSubCategory,
} from "./subCategory.controller.js";
import {
  checkSubcategoryExist,
  checkSubcategoryIdExist,
} from "../../Middlewares/subCategory.middleware.js";

const subCategoryRouter = Router();

subCategoryRouter
  .route("/")
  .post(addSubCategory)
  .get(checkSubcategoryExist, allSubCategories);

subCategoryRouter.use(checkSubcategoryIdExist);
subCategoryRouter
  .route("/:id")
  .get(getSubCategory)
  .put(updateSubCategory)
  .delete(deleteSubCategory);

export default subCategoryRouter;
