import { Router } from "express";
import { allowedTo, protectedRoutes } from "../auth/auth.controller.js";
import {
  createCashOrder,
  getAllOrders,
  getUserOrders,
} from "./order.controller.js";

const orderRouter = Router();

orderRouter.get("/myOrders", protectedRoutes, allowedTo("user"), getUserOrders);
orderRouter.route("/").get(protectedRoutes, allowedTo("admin"), getAllOrders);

orderRouter
  .route("/:id")
  .post(protectedRoutes, allowedTo("user"), createCashOrder);

export default orderRouter;
