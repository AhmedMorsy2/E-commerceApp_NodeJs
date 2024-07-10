import slugify from "slugify";
import { AppError } from "../../utils/appError.js";
import { catchError } from "../../utils/catchError.js";
import { Brand } from "../../../Database/Models/brand.model.js";

const addBrand = catchError(async (req, res) => {
  req.body.slug = slugify(req.body.name);
  let brand = new Brand(req.body);
  await brand.save();
  res.status(200).json({ message: "Success", brand });
});

const allBrands = catchError(async (req, res, next) => {
  let brands = await Brand.find();
  res.status(200).json({ message: "Success", brands });
});

const getBrand = catchError(async (req, res, next) => {
  let brand = await Brand.findById(req.params.id);
  res.status(200).json({ message: "Success", brand });
});

const updateBrand = catchError(async (req, res, next) => {
  req.body.slug = slugify(req.body.name);
  let brand = await Brand.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json({ message: "Success", brand });
});

const deleteBrand = catchError(async (req, res, next) => {
  let brand = await Brand.findByIdAndDelete(req.params.id);
  res.status(200).json({ message: "Success", brand });
});

export { addBrand, allBrands, updateBrand, deleteBrand, getBrand };
