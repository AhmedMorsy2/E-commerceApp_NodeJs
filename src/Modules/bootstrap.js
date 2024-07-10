import brandRouter from "./Brands/brands.routes.js";
import categoryRouter from "./Categories/categories.routes.js";
import subCategoryRouter from "./Subcategories/subCategory.routes.js";

export const bootstrap = (app) => {
  app.use("/api/categories", categoryRouter);
  app.use("/api/subcategories", subCategoryRouter);
  app.use("/api/brands", brandRouter);
};
