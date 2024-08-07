import slugify from "slugify";
import { Brand } from "../../../Database/Models/brand.model.js";
import { deleteOne, getAll, getOne } from "../handlers/handler.js";
import { catchError } from "../../Middlewares/catchError.js";
import { AppError } from "../../utils/appError.js";
import fs from "fs";

const addBrand = catchError(async (req, res) => {
  req.body.slug = slugify(req.body.name);
  req.body.logo = req.file.filename;
  let brand = new Brand(req.body);
  await brand.save();
  res.status(200).json({ message: "Success", brand });
});

const allBrands = getAll(Brand);

const getBrand = getOne(Brand);

const updateBrand = catchError(async (req, res, next) => {
  req.body.slug = slugify(req.body.name);
  if (req.file) {
    let brand = await Brand.findById(req.params.id);
    if (!brand) return next(new AppError("Brand not found", 404));
    let parts = brand.logo.split("http://localhost:3000/");
    const imageName = parts[parts.length - 1];
    fs.unlinkSync(imageName);
    req.body.logo = req.file.filename;
  }
  let brand = await Brand.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  brand || next(new AppError("Brand not found", 404));
  !brand || res.status(200).json({ message: "Success", brand });
});

const deleteBrand = deleteOne(Brand);

export { addBrand, allBrands, updateBrand, deleteBrand, getBrand };
