import { Router } from "express";
import { createUserValidation } from "../middlewares/validations/user.validation.js";
import { validator } from "../middlewares/validator.middleware.js";
import { login, register } from "../controllers/auth.controller.js";
import { loginValidation } from "../middlewares/validations/auth.validation.js";

export const authRouter = Router();

authRouter.post("/auth/register", createUserValidation, validator, register);

authRouter.post("/auth/login", loginValidation, validator, login);
