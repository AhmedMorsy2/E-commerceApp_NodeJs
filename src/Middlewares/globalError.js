export const globalError = (err, req, res, next) => {
  let code = err.statusCode || 500;
  res.status(code).json({ error: "Error", code: code, message: err.message });
};
