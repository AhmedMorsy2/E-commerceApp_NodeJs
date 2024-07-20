import { Router } from "express";
import {
  addUser,
  allUsers,
  deleteUser,
  getUser,
  updateUser,
} from "./user.controller.js";

const userRouter = Router();

userRouter.route("/").post(addUser).get(allUsers);

userRouter.route("/:id").get(getUser).put(updateUser).delete(deleteUser);

export default userRouter;
