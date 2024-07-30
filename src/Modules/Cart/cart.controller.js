import { Cart } from "../../../Database/Models/cart.model.js";
import { Coupon } from "../../../Database/Models/coupon.model.js";
import { Product } from "../../../Database/Models/product.model.js";
import { catchError } from "../../Middlewares/catchError.js";
import { AppError } from "../../utils/appError.js";

function calcTotalPrice(isCartExist) {
  isCartExist.totalCartPrice = isCartExist.cartItems.reduce(
    (prev, item) => (prev += item.quantity * item.price),
    0
  );
  if (isCartExist.discount) {
    isCartExist.totalCartPriceAfterDiscount =
      isCartExist.totalCartPrice -
      (isCartExist.totalCartPrice * isCartExist.discount) / 100;
    isCartExist.discount = isCartExist.discount;
  }
}

const addToCart = catchError(async (req, res, next) => {
  let isCartExist = await Cart.findOne({ user: req.user._id });
  let product = await Product.findById(req.body.product);
  if (!product) return next(new AppError("Product not found", 404));
  req.body.price = product.price;
  if (req.body.quantity > product.stock)
    return next(new AppError("Sold Out", 404));
  if (!isCartExist) {
    let cart = new Cart({
      user: req.user._id,
      cartItems: [req.body],
    });
    calcTotalPrice(cart);
    await cart.save();
    res.status(200).json({ message: "Success", cart });
  } else {
    let item = isCartExist.cartItems.find(
      (item) => item.product == req.body.product
    );
    if (item) {
      item.quantity += req.body.quantity || 1;
      // if (item.quantity > product.stock)
      //   return next(new AppError("Sold Out", 404));
    }
    if (!item) isCartExist.cartItems.push(req.body);
    calcTotalPrice(isCartExist);
    await isCartExist.save();
    res.status(200).json({ message: "Success", cart: isCartExist });
  }
});

const updateQuantity = catchError(async (req, res, next) => {
  let cart = await Cart.findOne({ user: req.user._id });
  let item = cart.cartItems.find((item) => item.product == req.params.id);
  if (!item) return next(new AppError("Product not found ", 404));

  item.quantity = req.body.quantity;
  calcTotalPrice(cart);
  await cart.save();

  res.status(200).json({ message: "Success", cart });
});

const removeCartItem = catchError(async (req, res, next) => {
  let cart = await Cart.findOneAndUpdate(
    { user: req.user._id },
    { $pull: { cartItems: { _id: req.params.id } } }
  );
  calcTotalPrice(cart);
  await cart.save();

  cart || next(new AppError("Cart not found", 404));
  !cart || res.status(200).json({ message: "Success", cart });
});

const getLoggedUserCart = catchError(async (req, res, next) => {
  let cart = await Cart.findOne({ user: req.user._id }).populate(
    "cartItems.product",
    "title imageCover images price"
  );
  res.status(200).json({ message: "Success", cart });
});

const clearUserCart = catchError(async (req, res, next) => {
  let cart = await Cart.findOneAndDelete({ user: req.user._id });
  cart || next(new AppError("There is no cart"));
  !cart || res.status(200).json({ message: "Success", cart });
});

const applyCoupon = catchError(async (req, res, next) => {
  let coupun = await Coupon.findOne({
    code: req.body.code,
    expiryDate: { $gt: Date.now() },
  });
  if (!coupun) return next(new AppError("Oops coupun invalid", 401));
  let cart = await Cart.findOne({ user: req.user._id });

  await cart.save();
  res.status(200).json({ message: "Success" });
});

export {
  addToCart,
  applyCoupon,
  clearUserCart,
  getLoggedUserCart,
  removeCartItem,
  updateQuantity,
};
