import slugify from "slugify";
import { getAll } from "../handlers/handler.js";
import { catchError } from "../../Middlewares/catchError.js";
import { AppError } from "../../utils/appError.js";
import { Review } from "../../../Database/Models/review.model.js";

const addReview = catchError(async (req, res) => {
  req.body.user = req.user._id;

  let review = new Review(req.body);
  await review.save();
  res.status(200).json({ message: "Success", review });
});

const allReviews = getAll(Review);

const getReview = catchError(async (req, res, next) => {
  let review = await Review.findById(req.params.id);
  review || next(new AppError("Review not found", 404));
  !review || res.status(200).json({ message: "Success", review });
});

const updateReview = catchError(async (req, res, next) => {
  let review = await Review.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  review || next(new AppError("Review not found", 404));
  !review || res.status(200).json({ message: "Success", review });
});

const deleteReview = catchError(async (req, res, next) => {
  let review = await Review.findByIdAndDelete(req.params.id);
  review || next(new AppError("Review not found", 404));
  !review || res.status(200).json({ message: "Success", review });
});

export { addReview, allReviews, updateReview, deleteReview, getReview };
