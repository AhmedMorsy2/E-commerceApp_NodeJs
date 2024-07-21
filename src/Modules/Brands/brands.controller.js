import slugify from "slugify";
import { Brand } from "../../../Database/Models/brand.model.js";
import { getAll } from "../handlers/handler.js";
import { catchError } from "../../Middlewares/catchError.js";
import { AppError } from "../../utils/appError.js";

const addBrand = catchError(async (req, res) => {
  req.body.slug = slugify(req.body.name);
  req.body.logo = req.file.filename;
  let brand = new Brand(req.body);
  await brand.save();
  res.status(200).json({ message: "Success", brand });
});

const allBrands = getAll(Brand);

const getBrand = catchError(async (req, res, next) => {
  let brand = await Brand.findById(req.params.id);
  brand || next(new AppError("Brand not found", 404));
  !brand || res.status(200).json({ message: "Success", brand });
});

const updateBrand = catchError(async (req, res, next) => {
  if (req.bod.slug) req.body.slug = slugify(req.body.name);
  if (req.file) req.body.logo = req.file.filename;
  let brand = await Brand.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  brand || next(new AppError("Brand not found", 404));
  !brand || res.status(200).json({ message: "Success", brand });
  res.status(200).json({ message: "Success", brand });
});

const deleteBrand = catchError(async (req, res, next) => {
  let brand = await Brand.findByIdAndDelete(req.params.id);
  brand || next(new AppError("Brand not found", 404));
  !brand || res.status(200).json({ message: "Success", brand });
});

export { addBrand, allBrands, updateBrand, deleteBrand, getBrand };
