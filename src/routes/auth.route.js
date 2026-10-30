import { Router } from "express";
import {
  createUserValidation,
  updateProfileValidation,
} from "../middlewares/validations/user.validation.js";
import { validator } from "../middlewares/validator.middleware.js";
import {
  getProfile,
  login,
  logout,
  register,
  updateProfile,
} from "../controllers/auth.controller.js";
import { loginValidation } from "../middlewares/validations/auth.validation.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

export const authRouter = Router();

authRouter.post("/auth/register", createUserValidation, validator, register);
authRouter.post("/auth/login", loginValidation, validator, login);
authRouter.get("/auth/profile", authMiddleware, getProfile);
authRouter.put(
  "/auth/profile",
  authMiddleware,
  updateProfileValidation,
  validator,
  updateProfile,
);
authRouter.post("/auth/logout", authMiddleware, logout);
