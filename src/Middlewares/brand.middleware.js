import { Brand } from "../../Database/Models/brand.model.js";
import { AppError } from "../utils/appError.js";
import { catchError } from "../utils/catchError.js";

const checkBrandExist = catchError(async (req, res, next) => {
  let brands = await Brand.find();
  brands.length === 0 ? next(new AppError("There is no Brands", 404)) : next();
});

const checkBrandIdExist = catchError(async (req, res, next) => {
  let brand = await Brand.findById(req.params.id);
  brand || next(new AppError("There is no Brand with this ID", 404));
  !brand || next();
});

export { checkBrandExist, checkBrandIdExist };
