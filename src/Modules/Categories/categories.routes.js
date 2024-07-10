import { Router } from "express";
import {
  addCategory,
  allCategories,
  deleteCategory,
  getCategory,
  updateCategory,
} from "./categories.controller.js";
import {
  checkCategoryExist,
  checkIdExist,
} from "../../Middlewares/categories.middleware.js";

const categoryRouter = Router();

categoryRouter
  .route("/")
  .post(addCategory)
  .get(checkCategoryExist, allCategories);

categoryRouter.use(checkIdExist);
categoryRouter
  .route("/:id")
  .get(getCategory)
  .put(updateCategory)
  .delete(deleteCategory);

export default categoryRouter;
