import { User } from "../../../Database/Models/user.model.js";
import { catchError } from "../../Middlewares/catchError.js";
import { AppError } from "../../utils/appError.js";

const addAddress = catchError(async (req, res, next) => {
  let address = await User.findByIdAndUpdate(
    req.user._id,
    { $push: { addresses: req.body } },
    { new: true }
  );
  address || next(new AppError("address not found", 404));
  !address ||
    res.status(200).json({ message: "Success", address: address.addresses });
});

const removeAddress = catchError(async (req, res, next) => {
  let address = await User.findByIdAndUpdate(
    req.user._id,
    { $pull: { addresses: { _id: req.params.id } } },
    {
      new: true,
    }
  );
  address || next(new AppError("address not found", 404));
  !address ||
    res.status(200).json({ message: "Success", address: address.addresses });
});

const getLoggedUserAddress = catchError(async (req, res, next) => {
  let address = await User.findById(req.user._id).populate("addresses");
  address || next(new AppError("address not found", 404));
  !address ||
    res.status(200).json({ message: "Success", address: address.addresses });
});

export { addAddress, removeAddress, getLoggedUserAddress };
