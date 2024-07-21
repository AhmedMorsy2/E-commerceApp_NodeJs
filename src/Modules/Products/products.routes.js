import { Router } from "express";

import {
  addProduct,
  allProducts,
  deleteProduct,
  getProduct,
  updateProduct,
} from "./products.controller.js";
import { uploadMixOfFiles } from "../../FileUpload/fileUpload.js";
import { addProductValidation } from "./productvalidation.js";
import { validations } from "../../Middlewares/validation.js";

const productRouter = Router();

productRouter
  .route("/")
  .post(
    uploadMixOfFiles(
      [
        { name: "imageCover", maxCount: 1 },
        { name: "images", maxCount: 10 },
      ],
      "products"
    ),
    validations(addProductValidation),
    addProduct
  )
  .get(allProducts);

productRouter
  .route("/:id")
  .get(getProduct)
  .put(
    uploadMixOfFiles(
      [
        { name: "imageCover", maxCount: 1 },
        { name: "images", maxCount: 10 },
      ],
      "products"
    ),
    updateProduct
  )
  .delete(deleteProduct);

export default productRouter;
