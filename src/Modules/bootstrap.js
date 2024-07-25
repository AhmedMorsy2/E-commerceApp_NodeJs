import addressRouter from "./Addresses/address.routes.js";
import authRouter from "./auth/auth.routes.js";
import brandRouter from "./Brands/brands.routes.js";
import cartRouter from "./Cart/cart.routes.js";
import categoryRouter from "./Categories/categories.routes.js";
import couponRouter from "./Coupon/coupon.routes.js";
import productRouter from "./Products/products.routes.js";
import reviewRouter from "./Review/review.routes.js";
import subCategoryRouter from "./Subcategories/subCategory.routes.js";
import userRouter from "./Users/user.routes.js";
import wishlistRouter from "./Wishlist/wishlist.routes.js";

export const bootstrap = (app) => {
  app.use("/api/categories", categoryRouter);
  app.use("/api/subcategories", subCategoryRouter);
  app.use("/api/brands", brandRouter);
  app.use("/api/products", productRouter);
  app.use("/api/users", userRouter);
  app.use("/api/auth", authRouter);
  app.use("/api/reviews", reviewRouter);
  app.use("/api/wishlists", wishlistRouter);
  app.use("/api/addresses", addressRouter);
  app.use("/api/coupons", couponRouter);
  app.use("/api/carts", cartRouter);
};
