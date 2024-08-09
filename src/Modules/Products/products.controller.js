import { Product } from "../../../Database/Models/product.model.js";
import { deleteOne, getAll, getOne } from "../handlers/handler.js";
import { catchError } from "../../Middlewares/catchError.js";
import { AppError } from "../../utils/appError.js";
import slugify from "slugify";
import fs from "fs";

const addProduct = catchError(async (req, res) => {
  req.body.slug = slugify(req.body.title);
  req.body.imageCover = req.files.imageCover[0].filename;
  req.body.images = req.files.images.map((img) => img.filename);
  let product = new Product(req.body);
  await product.save();
  res.status(200).json({ message: "Success", product });
});

const allProducts = getAll(Product);

const getProduct = getOne(Product);

const updateProduct = catchError(async (req, res, next) => {
  if (req.body.title) req.body.slug = slugify(req.body.title);
  if (req.files) {
    let product = await Product.findById(req.params.id);
    if (!product) return next(new AppError("Product not found", 404));

    if (req.files.imageCover && req.files.imageCover.length > 0) {
      let partsCover = product.imageCover.split(
        `${req.protocol}://${req.get("host")}/`
      );
      const imageCoverName = partsCover[partsCover.length - 1];
      fs.unlinkSync(imageCoverName);
      req.body.imageCover = req.files.imageCover[0].filename;
    }

    if (req.files.images && req.files.images.length > 0) {
      product.images.forEach((img) => {
        let partsImage = img.split(`${req.protocol}://${req.get("host")}/`);
        const imageName = partsImage[partsImage.length - 1];
        fs.unlinkSync(imageName);
      });
      req.body.images = req.files.images.map((file) => file.filename);
    }
  }

  let product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  product || next(new AppError("Product not found", 404));
  !product || res.status(200).json({ message: "Success", product });
});

const deleteProduct = catchError(async (req, res, next) => {
  let product = await Product.findById(req.params.id);
  if (!product) return next(new AppError("Product not found", 404));

  let partsCover = product.imageCover.split(
    `${req.protocol}://${req.get("host")}/`
  );
  const imageCoverName = partsCover[partsCover.length - 1];
  fs.unlinkSync(imageCoverName);

  product.images.forEach((img) => {
    let partsImage = img.split(`${req.protocol}://${req.get("host")}/`);
    const imageName = partsImage[partsImage.length - 1];
    fs.unlinkSync(imageName);
  });

  await Product.findByIdAndDelete(req.params.id);
  product || next(new AppError("Product not found", 404));
  !product || res.status(200).json({ message: "Success", product });
});

export { addProduct, allProducts, updateProduct, deleteProduct, getProduct };
