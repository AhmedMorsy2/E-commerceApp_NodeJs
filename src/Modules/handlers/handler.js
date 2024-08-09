import { catchError } from "../../Middlewares/catchError.js";
import { ApiFeature } from "../../utils/ApiFeatures.js";
import { AppError } from "../../utils/appError.js";

const deleteOne = (model) => {
  return catchError(async (req, res, next) => {
    let document = await model.findByIdAndDelete(req.params.id);
    if (document.length === 0)
      return next(new AppError("document not found", 404));
    return res.status(200).json({ message: "Success", document });
  });
};

const getOne = (model) => {
  return catchError(async (req, res, next) => {
    let document = await model.findById(req.params.id);
    document || next(new AppError("document not found", 404));
    !document || res.status(200).json({ message: "Success", document });
  });
};

const getAll = (model) => {
  return catchError(async (req, res, next) => {
    let apiFeatures = new ApiFeature(model.find(), req.query)
      .pagination()
      .sort()
      .filter()
      .fields()
      .search();
    let document = await apiFeatures.mongooseQuery;

    res.status(200).json({
      message: "success",
      MetaData: {
        Page: apiFeatures.pageNumber,
        limit: apiFeatures.limit,
        total: document.length,
      },
      document,
    });
  });
};

export { deleteOne, getAll, getOne };
