import { Router } from "express";
import {
  addBrand,
  allBrands,
  deleteBrand,
  getBrand,
  updateBrand,
} from "./brands.controller.js";
import {
  checkBrandExist,
  checkBrandIdExist,
} from "../../Middlewares/brand.middleware.js";

const brandRouter = Router();

brandRouter.route("/").post(addBrand).get(checkBrandExist, allBrands);

brandRouter.use(checkBrandIdExist);
brandRouter.route("/:id").get(getBrand).put(updateBrand).delete(deleteBrand);

export default brandRouter;
