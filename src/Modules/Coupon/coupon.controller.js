import { Coupon } from "../../../Database/Models/coupon.model.js";
import { catchError } from "../../Middlewares/catchError.js";
import { AppError } from "../../utils/appError.js";
import { deleteOne, getAll, getOne } from "../handlers/handler.js";

const addCoupon = catchError(async (req, res, next) => {
  let isExist = await Coupon.findOne({ code: req.body.code });
  if (isExist) return next(new AppError("Coupon already exist", 409));
  let coupon = new Coupon(req.body);
  await coupon.save();
  res.status(200).json({ message: "Success", coupon });
});

const allCoupons = getAll(Coupon);

const getCoupon = getOne(Coupon);

const updateCoupon = catchError(async (req, res, next) => {
  let coupon = await Coupon.findOneAndUpdate({ _id: req.params.id }, req.body, {
    new: true,
  });
  coupon ||
    next(new AppError("Coupon not found or You not created Coupon", 404));
  !coupon || res.status(200).json({ message: "Success", coupon });
});

const deleteCoupon = deleteOne(Coupon);

export { addCoupon, allCoupons, deleteCoupon, getCoupon, updateCoupon };
