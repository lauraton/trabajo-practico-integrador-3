import { Router } from "express";
import {
  adminMiddleware,
  authMiddleware,
} from "../middlewares/auth.middleware.js";
import {
  createCategory,
  deleteCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
} from "../controllers/category.controller.js";
import {
  categoryIdValidation,
  createCategoryValidation,
  updateCategoryValidation,
} from "../middlewares/validations/category.validation.js";
import { validator } from "../middlewares/validator.middleware.js";

export const categoryRouter = Router();

categoryRouter.post(
  "/categories",
  authMiddleware,
  adminMiddleware,
  createCategoryValidation,
  validator,
  createCategory,
);

categoryRouter.get("/categories", authMiddleware, getAllCategories);

categoryRouter.get(
  "/categories/:id",
  authMiddleware,
  categoryIdValidation,
  validator,
  getCategoryById,
);

categoryRouter.put(
  "/categories/:id",
  authMiddleware,
  adminMiddleware,
  categoryIdValidation,
  updateCategoryValidation,
  validator,
  updateCategory,
);

categoryRouter.delete(
  "/categories/:id",
  authMiddleware,
  adminMiddleware,
  categoryIdValidation,
  validator,
  deleteCategory,
);
