import slugify from "slugify";
import { catchError } from "../../utils/catchError.js";
import { Product } from "../../../Database/Models/product.model.js";
import { AppError } from "../../utils/appError.js";
import { ApiFeature } from "../../utils/ApiFeatures.js";

const addProduct = catchError(async (req, res) => {
  req.body.slug = slugify(req.body.title);

  req.body.imageCover = req.files.imageCover[0].filename;
  req.body.images = req.files.images.map((img) => img.filename);

  let product = new Product(req.body);
  await product.save();
  res.status(200).json({ message: "Success", product });
});

const allProducts = catchError(async (req, res, next) => {
  let apiFeatures = new ApiFeature(Product.find(), req.query)
    .pagination()
    .sort()
    .filter()
    .fields()
    .search();
  let products = await apiFeatures.mongooseQuery;

  res.status(200).json({
    message: "success",
    MetaData: {
      Page: apiFeatures.pageNumber,
      limit: apiFeatures.limit,
      total: products.length,
    },
    products,
  });
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
