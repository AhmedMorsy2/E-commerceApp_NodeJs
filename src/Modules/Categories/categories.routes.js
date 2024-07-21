import { Router } from "express";
import {
  addCategory,
  allCategories,
  deleteCategory,
  getCategory,
  updateCategory,
} from "./categories.controller.js";
import { uploadSingleFile } from "../../FileUpload/fileUpload.js";
import { addCategoeyValidation } from "./categories.validation.js";
import subCategoryRouter from "../Subcategories/subCategory.routes.js";
import { validations } from "../../Middlewares/validation.js";
import { allowedTo, protectedRoutes } from "../auth/auth.controller.js";

const categoryRouter = Router();
categoryRouter.use("/:category/suncatedories", subCategoryRouter);

categoryRouter
  .route("/")
  .post(
    protectedRoutes,
    allowedTo("admin"),
    uploadSingleFile("image", "categories"),
    validations(addCategoeyValidation),
    addCategory
  )
  .get(allCategories);

categoryRouter
  .route("/:id")
  .get(getCategory)
  .put(
    protectedRoutes,
    allowedTo("admin"),
    uploadSingleFile("image", "categories"),
    updateCategory
  )
  .delete(protectedRoutes, allowedTo("admin"), deleteCategory);

export default categoryRouter;
