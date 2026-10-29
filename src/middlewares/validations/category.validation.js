import { param, body } from "express-validator";
import { CategoryModel } from "../../models/category.model.js";

export const createCategoryValidation = [
  body("name")
    .notEmpty()
    .withMessage("name no puede estar vacío")
    .isString()
    .withMessage("name debe ser un string")
    .isLength({ min: 2, max: 30 })
    .withMessage("name debe estar en un rango de 2-30 caracteres")
    .custom(async (name) => {
      const existing = await CategoryModel.findOne({ name });
      if (existing) {
        throw new Error("Ya existe una categoría con ese nombre");
      }
      return true;
    }),
  body("description")
    .optional()
    .isString()
    .withMessage("description debe ser un string")
    .isLength({ max: 200 })
    .withMessage("description debe tener un máximo de 200 caracteres"),
];

export const updateCategoryValidation = [
  body("name")
    .optional()
    .notEmpty()
    .withMessage("name no puede estar vacío")
    .isString()
    .withMessage("name debe ser un string")
    .isLength({ min: 2, max: 30 })
    .withMessage("name debe estar en un rango de 2-30 caracteres")
    .custom(async (name, { req }) => {
      const existing = await CategoryModel.findOne({
        name,
        _id: { $ne: req.params.id },
      });
      if (existing) {
        throw new Error("Ya existe una categoría con ese nombre");
      }
      return true;
    }),
  body("description")
    .optional()
    .isString()
    .withMessage("description debe ser un string")
    .isLength({ max: 200 })
    .withMessage("description debe tener un máximo de 200 caracteres"),
];

export const categoryIdValidation = [
  param("id").isMongoId().withMessage("El id no es un ObjectId válido"),
];
