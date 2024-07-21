process.on("uncaughtException", (err) => {
  return new AppError({ error: err }, 500);
});

import express from "express";
import { db } from "./Database/dbConnection.js";
import { bootstrap } from "././src/Modules/bootstrap.js";
import { AppError } from "./src/utils/appError.js";
import { globalError } from "./src/Middlewares/globalError.js";

const app = express();
const port = 3000;
app.use(express.json());

app.use("/uploads", express.static("uploads"));

bootstrap(app);

app.use("*", (req, res, next) => {
  next(new AppError(`Route not found ${req.originalUrl}`, 404));
});
app.use(globalError);
process.on("unhandledRejection", (err) => {
  return new AppError({ error: err }, 500);
});
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
