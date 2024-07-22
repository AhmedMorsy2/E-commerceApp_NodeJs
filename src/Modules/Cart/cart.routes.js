import { Router } from "express";
import { allowedTo, protectedRoutes } from "../auth/auth.controller.js";
import {
  addToCart,
  applyCoupon,
  deleteLoggedUserCart,
  getLoggedUserCart,
  removeCartItem,
  updateQuantity,
} from "./cart.controller.js";

const cartRouter = Router();

cartRouter
  .route("/")
  .post(protectedRoutes, allowedTo("user"), addToCart)
  .get(protectedRoutes, allowedTo("user"), getLoggedUserCart)
  .delete(protectedRoutes, allowedTo("user"), deleteLoggedUserCart);

cartRouter
  .route("/:id")
  .put(protectedRoutes, allowedTo("user"), updateQuantity)
  .delete(protectedRoutes, allowedTo("user"), removeCartItem);

cartRouter.post(
  protectedRoutes,
  allowedTo("user"),
  "/apply-coupon",
  applyCoupon
);
export default cartRouter;
