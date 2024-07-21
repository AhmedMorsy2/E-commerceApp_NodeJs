import { AppError } from "../utils/appError.js";

export const validations = (schema) => {
  return (req, res, next) => {
    let dataForValidation = {
      ...req.body,
      ...req.params,
      ...req.query,
    };

    if (req.file) {
      if (req.file.fieldname === "image") {
        dataForValidation.image = req.file;
      } else if (req.file.fieldname === "logo") {
        dataForValidation.logo = req.file;
      }
    } else if (req.files) {
      if (req.files.imageCover) {
        dataForValidation.imageCover = req.files.imageCover[0];
      }
      if (req.files.images) {
        dataForValidation.images = req.files.images;
      }
    }

    let { error } = schema.validate(dataForValidation, { abortEarly: false });

    if (!error) {
      next();
    } else {
      let errMsgs = error.details.map((err) => err.message);
      next(new AppError(errMsgs, 401));
    }
  };
};
