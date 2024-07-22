import slugify from "slugify";
import { Product } from "../../../Database/Models/product.model.js";
import { getAll } from "../handlers/handler.js";
import { catchError } from "../../Middlewares/catchError.js";
import { AppError } from "../../utils/appError.js";

const addProduct = catchError(async (req, res) => {
  req.body.slug = slugify(req.body.title);

  req.body.imageCover = req.files.imageCover[0].filename;
  req.body.images = req.files.images.map((img) => img.filename);

  let product = new Product(req.body);
  await product.save();
  res.status(200).json({ message: "Success", product });
});

const allProducts = getAll(Product);

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
});

const deleteProduct = catchError(async (req, res, next) => {
  let product = await Product.findByIdAndDelete(req.params.id);
  product || next(new AppError("Product not found", 404));
  !product || res.status(200).json({ message: "Success", product });
  res.status(200).json({ message: "Success", product });
});

export { addProduct, allProducts, updateProduct, deleteProduct, getProduct };
