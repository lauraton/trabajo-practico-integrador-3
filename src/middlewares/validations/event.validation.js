import { param, body } from "express-validator";
import { EventModel } from "../../models/event.model.js";
import { CategoryModel } from "../../models/category.model.js";

export const createEventValidation = [
  body("title")
    .notEmpty()
    .withMessage("title no puede estar vacío")
    .isString()
    .withMessage("title debe ser un string")
    .isLength({ min: 3, max: 150 })
    .withMessage("title debe estar en un rango de 3-150 caracteres")
    .custom(async (title) => {
      const existing = await EventModel.findOne({ title });
      if (existing) {
        throw new Error("Ya existe un evento con ese título");
      }
      return true;
    }),
  body("description")
    .notEmpty()
    .withMessage("description no puede estar vacío")
    .isLength({ min: 20 })
    .withMessage("description debe tener un mínimo de 20 caracteres"),
  body("startDate")
    .notEmpty()
    .withMessage("startDate no puede estar vacío")
    .isDate()
    .withMessage("startDate debe tener un formato válido"),
  body("endDate")
    .notEmpty()
    .withMessage("endDate no puede estar vacío")
    .isDate()
    .withMessage("endDate debe tener un formato válido")
    .custom((endDate, { req }) => {
      if (new Date(endDate) <= new Date(req.body.startDate)) {
        throw new Error("endDate debe ser posterior a startDate");
      }
      return true;
    }),
  body("capacity")
    .notEmpty()
    .withMessage("capacity no puede estar vacío")
    .isInt({ min: 1 })
    .withMessage("capacity debe ser un entero mayor o igual a 1"),
  body("price")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("price debe ser un número mayor o igual a 0"),
  body("status")
    .optional()
    .isIn(["scheduled", "cancelled", "finished"])
    .withMessage(
      "status acepta solo valores permitidos ('scheduled', 'cancelled', 'finished')",
    ),
  body("location.venue")
    .notEmpty()
    .withMessage("venue no puede estar vacío")
    .isLength({ min: 3, max: 100 })
    .withMessage("venue debe tener un rango de 3-100 caracteres"),
  body("location.address")
    .notEmpty()
    .withMessage("address no puede estar vacío")
    .isLength({ min: 5, max: 150 })
    .withMessage("address debe tener un rango de 5-150 caracteres"),
  body("location.city")
    .notEmpty()
    .withMessage("city no puede estar vacío")
    .isLength({ min: 2, max: 50 })
    .withMessage("city debe tener un rango de 2-50 caracteres"),
  body("categories")
    .optional()
    .isArray()
    .withMessage("categories debe ser un array"),
  body("categories.*")
    .isMongoId()
    .withMessage("Cada categoría debe ser un id válido de mongo")
    .bail()
    .custom(async (categoryId) => {
      const category = await CategoryModel.findById(categoryId);
      if (!category) {
        throw new Error("La categoría no existe");
      }
      return true;
    }),
];

export const updateEventValidation = [
  body("title")
    .optional()
    .notEmpty()
    .withMessage("title no puede estar vacío")
    .isString()
    .withMessage("title debe ser un string")
    .isLength({ min: 3, max: 150 })
    .withMessage("title debe estar en un rango de 3-150 caracteres")
    .custom(async (title, { req }) => {
      const existing = await EventModel.findOne({
        title,
        _id: { $ne: req.params.id },
      });
      if (existing) {
        throw new Error("Ya existe un evento con ese título");
      }
      return true;
    }),
  body("description")
    .optional()
    .notEmpty()
    .withMessage("description no puede estar vacío")
    .isLength({ min: 20 })
    .withMessage("description debe tener un mínimo de 20 caracteres"),
  body("startDate")
    .optional()
    .notEmpty()
    .withMessage("startDate no puede estar vacío")
    .isDate()
    .withMessage("startDate debe tener un formato válido"),
  body("endDate")
    .optional()
    .notEmpty()
    .withMessage("endDate no puede estar vacío")
    .isDate()
    .withMessage("endDate debe tener un formato válido")
    .custom(async (endDate, { req }) => {
      let startDate = req.body.startDate;
      if (!startDate) {
        const event = await EventModel.findById(req.params.id);
        startDate = event?.startDate;
      }
      if (startDate && new Date(endDate) <= new Date(startDate)) {
        throw new Error("endDate debe ser posterior a startDate");
      }
      return true;
    }),
  body("capacity")
    .optional()
    .notEmpty()
    .withMessage("capacity no puede estar vacío")
    .isInt({ min: 1 })
    .withMessage("capacity debe ser un entero mayor o igual a 1"),
  body("price")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("price debe ser un número mayor o igual a 0"),
  body("status")
    .optional()
    .isIn(["scheduled", "cancelled", "finished"])
    .withMessage(
      "status acepta solo valores permitidos ('scheduled', 'cancelled', 'finished')",
    ),
  body("location.venue")
    .optional()
    .notEmpty()
    .withMessage("venue no puede estar vacío")
    .isLength({ min: 3, max: 100 })
    .withMessage("venue debe tener un rango de 3-100 caracteres"),
  body("location.address")
    .optional()
    .notEmpty()
    .withMessage("address no puede estar vacío")
    .isLength({ min: 5, max: 150 })
    .withMessage("address debe tener un rango de 5-150 caracteres"),
  body("location.city")
    .optional()
    .notEmpty()
    .withMessage("city no puede estar vacío")
    .isLength({ min: 2, max: 50 })
    .withMessage("city debe tener un rango de 2-50 caracteres"),
  body("categories")
    .optional()
    .isArray()
    .withMessage("categories debe ser un array"),
  body("categories.*")
    .isMongoId()
    .withMessage("Cada categoría debe ser un id válido de mongo")
    .bail()
    .custom(async (categoryId) => {
      const category = await CategoryModel.findById(categoryId);
      if (!category) {
        throw new Error("La categoría no existe");
      }
      return true;
    }),
];

export const eventIdValidation = [
  param("id").isMongoId().withMessage("El id no es un ObjectId válido"),
];
