import { Cart } from "../../../Database/Models/cart.model.js";
import { Order } from "../../../Database/Models/order.model.js";
import { Product } from "../../../Database/Models/product.model.js";
import { catchError } from "../../Middlewares/catchError.js";
import { AppError } from "../../utils/appError.js";

const createCashOrder = catchError(async (req, res, next) => {
  // 1- get user cart by cartId
  let cart = await Cart.findById(req.params.id);
  // let cart = await Cart.findOne({ user: req.user._id });

  if (!cart) return next(new AppError("Cart not found", 404));

  // 2- total order price
  let totalOrderPrice = cart.totalCartPrice || cart.totalCartPriceAfterDiscount;

  // 3- create order
  let order = new Order({
    user: req.user._id,
    orderItems: cart.cartItems,
    shippingAddress: req.body.shippingAddress,
    totalOrderPrice,
  });
  await order.save();

  // 4- increment sold & decrement stock
  let options = cart.cartItems.map((item) => {
    return {
      updateOne: {
        filter: { _id: item.product },
        update: { $inc: { sold: item.quantity, stock: -item.quantity } },
      },
    };
  });
  Product.bulkWrite(options);

  // 5- clear user cart
  await Cart.findByIdAndDelete(cart._id);

  res.status(200).json({ message: "success", data: order });
});

//  users/:id/orders
const getUserOrders = catchError(async (req, res, next) => {
  let orders = await Order.find({ user: req.user._id }).populate(
    "orderItems.product"
  );
  if (orders.length === 0) return next(new AppError("There is no orders", 404));
  res.status(200).json({ message: "success", data: orders });
});

const getAllOrders = catchError(async (req, res, next) => {
  let orders = await Order.find();
  if (orders.length === 0) return next(new AppError("There is no orders", 404));
  res.status(200).json({ message: "success", orders });
});

export { createCashOrder, getUserOrders, getAllOrders };
