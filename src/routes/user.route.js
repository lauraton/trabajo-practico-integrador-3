import { Router } from "express";
import {
  adminMiddleware,
  authMiddleware,
} from "../middlewares/auth.middleware.js";
import {
  deleteUser,
  getAllUsers,
  getUserById,
  updateUser,
} from "../controllers/user.controller.js";
import {
  updateProfileValidation,
  updateUserValidation,
  userIdValidation,
} from "../middlewares/validations/user.validation.js";
import { validator } from "../middlewares/validator.middleware.js";

export const userRouter = Router();

userRouter.get("/users", authMiddleware, adminMiddleware, getAllUsers);

userRouter.get(
  "/users/:id",
  authMiddleware,
  adminMiddleware,
  userIdValidation,
  validator,
  getUserById,
);

userRouter.put(
  "/users/:id",
  authMiddleware,
  adminMiddleware,
  userIdValidation,
  updateUserValidation,
  updateProfileValidation,
  validator,
  updateUser,
);

userRouter.delete(
  "/users/:id",
  authMiddleware,
  adminMiddleware,
  userIdValidation,
  validator,
  deleteUser,
);
