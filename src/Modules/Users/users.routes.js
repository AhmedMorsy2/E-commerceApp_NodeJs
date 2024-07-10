import {
  checkuser,
  checkUserExist,
  emailExist,
} from "../../Middlewares/users.middleware.js";
import { checkToken } from "../../utils/checkToken.js";
import {
  deleteProfile,
  getOtherUserProfile,
  getUserProfile,
  signin,
  signUp,
  updateUser,
} from "./users.controller.js";
import { Router } from "express";

const userRouter = Router();

userRouter.post("/signup", emailExist, signUp);
userRouter.post("/signin", checkuser, signin);
userRouter.use(checkToken, checkUserExist);
userRouter.route("/").put(updateUser).delete(deleteProfile).get(getUserProfile);
userRouter.get("/:id", getOtherUserProfile);

export default userRouter;
