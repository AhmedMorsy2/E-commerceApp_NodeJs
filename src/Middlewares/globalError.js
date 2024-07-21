import { AppError } from "../utils/appError.js";

export const globalError = (err, req, res, next) => {
  let code = err.statusCode || 500;
  next(new AppError({ error: "Error", message: err.message }, code));
};
