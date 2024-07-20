import brandRouter from "./Brands/brands.routes.js";
import categoryRouter from "./Categories/categories.routes.js";
import productRouter from "./Products/products.routes.js";
import subCategoryRouter from "./Subcategories/subCategory.routes.js";
import userRouter from "./Users/user.routes.js";

export const bootstrap = (app) => {
  app.use("/api/categories", categoryRouter);
  app.use("/api/subcategories", subCategoryRouter);
  app.use("/api/brands", brandRouter);
  app.use("/api/products", productRouter);
  app.use("/api/users", userRouter);
};
