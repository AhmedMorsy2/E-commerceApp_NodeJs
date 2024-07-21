import { Router } from "express";
import {
  addBrand,
  allBrands,
  deleteBrand,
  getBrand,
  updateBrand,
} from "./brands.controller.js";
import { uploadSingleFile } from "../../FileUpload/fileUpload.js";
import { addBrandValidation } from "./brands.validation.js";
import { validations } from "../../Middlewares/validation.js";

const brandRouter = Router();

brandRouter
  .route("/")
  .post(
    uploadSingleFile("logo", "brands"),
    validations(addBrandValidation),
    addBrand
  )
  .get(allBrands);

brandRouter
  .route("/:id")
  .get(getBrand)
  .put(uploadSingleFile("logo", "brands"), updateBrand)
  .delete(deleteBrand);

export default brandRouter;
