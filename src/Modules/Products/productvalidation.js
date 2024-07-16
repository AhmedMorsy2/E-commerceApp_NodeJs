import Joi from "joi";

const addProductValidation = Joi.object({
  title: Joi.string().min(1).max(50).required(),
  description: Joi.string().min(1).max(5000).required(),
  price: Joi.number().required(),
  stock: Joi.number().required(),
  category: Joi.string().required(),
  imageCover: Joi.object({
    fieldname: Joi.string().required(),
    originalname: Joi.string().required(),
    encoding: Joi.string().required(),
    mimetype: Joi.string()
      .valid("image/jpeg ", "image/png", "image/gif", "image/jpg")
      .required(),
    size: Joi.number().max(5242880).required(),
    destination: Joi.string().required(),
    filename: Joi.string().required(),
    path: Joi.string().required(),
  }).required(),
  images: Joi.array()
    .items(
      Joi.object({
        fieldname: Joi.string().required(),
        originalname: Joi.string().required(),
        encoding: Joi.string().required(),
        mimetype: Joi.string()
          .valid("image/jpeg ", "image/png", "image/gif", "image/jpg")
          .required(),
        size: Joi.number().max(5242880).required(),
        destination: Joi.string().required(),
        filename: Joi.string().required(),
        path: Joi.string().required(),
      })
    )
    .required(),
});

export { addProductValidation };
