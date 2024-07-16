import slugify from "slugify";
import { catchError } from "../../utils/catchError.js";
import { Product } from "../../../Database/Models/product.model.js";
import { AppError } from "../../utils/appError.js";

const addProduct = catchError(async (req, res) => {
  req.body.slug = slugify(req.body.title);

  req.body.imageCover = req.files.imageCover[0].filename;
  req.body.images = req.files.images.map((img) => img.filename);

  let product = new Product(req.body);
  await product.save();
  res.status(200).json({ message: "Success", product });
});

const allProducts = catchError(async (req, res, next) => {
  let product = await Product.find();
  product.length === 0
    ? next(new AppError("There is no Products", 404))
    : res.status(200).json({ message: "Success", product });
});

const getProduct = catchError(async (req, res, next) => {
  let product = await Product.findById(req.params.id);
  product || next(new AppError("Product not found", 404));
  !product || res.status(200).json({ message: "Success", product });
});

const updateProduct = catchError(async (req, res, next) => {
  req.body.slug = slugify(req.body.title);
  let product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  product || next(new AppError("Product not found", 404));
  !product || res.status(200).json({ message: "Success", product });

  res.status(200).json({ message: "Success", product });
});

const deleteProduct = catchError(async (req, res, next) => {
  let product = await Product.findByIdAndDelete(req.params.id);
  product || next(new AppError("Product not found", 404));
  !product || res.status(200).json({ message: "Success", product });
  res.status(200).json({ message: "Success", product });
});

export { addProduct, allProducts, updateProduct, deleteProduct, getProduct };
