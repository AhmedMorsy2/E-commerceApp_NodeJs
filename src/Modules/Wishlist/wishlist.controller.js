import { User } from "../../../Database/Models/user.model.js";
import { catchError } from "../../Middlewares/catchError.js";
import { AppError } from "../../utils/appError.js";

const addToWishlist = catchError(async (req, res, next) => {
  let wishlist = await User.findByIdAndUpdate(
    req.user._id,
    { $addToSet: { wishList: req.body.product } },
    {
      new: true,
    }
  );
  wishlist || next(new AppError("Wishlist not found", 404));
  !wishlist || res.status(200).json({ message: "Success", wishlist });
});

const removeFromWishlist = catchError(async (req, res, next) => {
  let wishlist = await User.findByIdAndUpdate(
    req.user._id,
    { $pull: { wishList: req.params.id } },
    {
      new: true,
    }
  );
  wishlist || next(new AppError("Wishlist not found", 404));
  !wishlist ||
    res.status(200).json({ message: "Success", Wishlist: wishlist.wishList });
});

const getLoggedUserWishlist = catchError(async (req, res, next) => {
  let wishlist = await User.findById(req.user._id).populate("wishList");
  wishlist || next(new AppError("Wishlist not found", 404));
  !wishlist ||
    res.status(200).json({ message: "Success", Wishlist: wishlist.wishList });
});

export { addToWishlist, getLoggedUserWishlist, removeFromWishlist };
