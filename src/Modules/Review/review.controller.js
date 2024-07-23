import { Review } from "../../../Database/Models/review.model.js";
import { catchError } from "../../Middlewares/catchError.js";
import { AppError } from "../../utils/appError.js";
import { deleteOne, getAll } from "../handlers/handler.js";

const addReview = catchError(async (req, res, next) => {
  req.body.user = req.user._id;
  let isExist = await Review.findOne({
    user: req.user._id,
    product: req.body.product,
  });
  if (isExist) return next(new AppError("You already have a review", 401));
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
  let review = await Review.findOneAndUpdate(
    { _id: req.params.id, user: req.user._id },
    req.body,
    { new: true }
  );
  review ||
    next(new AppError("Review not found or You not created review", 404));
  !review || res.status(200).json({ message: "Success", review });
});

const deleteReview = deleteOne(Review);

export { addReview, allReviews, deleteReview, getReview, updateReview };
