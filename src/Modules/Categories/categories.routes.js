import { Router } from "express";
import {
  addCategory,
  allCategories,
  deleteCategory,
  getCategory,
  updateCategory,
} from "./categories.controller.js";
import { uploadSingleFile } from "../../FileUpload/fileUpload.js";

const categoryRouter = Router();

categoryRouter
  .route("/")
  .post(uploadSingleFile("image", "categories"), addCategory)
  .get(allCategories);

categoryRouter
  .route("/:id")
  .get(getCategory)
  .put(uploadSingleFile("image", "categories"), updateCategory)
  .delete(deleteCategory);

export default categoryRouter;
