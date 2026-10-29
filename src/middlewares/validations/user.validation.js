import { param, body } from "express-validator";
import { UserModel } from "../../models/user.model.js";

export const createUserValidation = [
  body("username")
    .notEmpty()
    .withMessage("username no puede estar vacío")
    .isAlphanumeric()
    .withMessage("username debe estar en alfanumerico")
    .isLength({ min: 3, max: 20 })
    .withMessage("username debe estar en un rango de 3-20 caracteres")
    .custom(async (username) => {
      const existingUsername = await UserModel.findOne({ username });
      if (existingUsername) {
        throw new Error("El username ya está en uso.");
      }
      return true;
    }),

  body("email")
    .notEmpty()
    .withMessage("email no puede estar vacío")
    .isEmail()
    .withMessage("email debe cumplir el formato")
    .custom(async (email) => {
      const user = await UserModel.findOne({ email });
      if (user) {
        throw new Error("Ya existe un user con ese email");
      }
      return true;
    }),
  body("password")
    .notEmpty()
    .withMessage("Password no puede estar vacío")
    .isStrongPassword({
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 0,
    })
    .withMessage(
      "password debe tener mínimo 8 caracteres, una mayúscula, una minúscula y un número",
    ),
  body("role")
    .optional()
    .isIn(["user", "admin"])
    .withMessage("El role debe ser 'user' o 'admin'"),
  body("profile.firstName")
    .notEmpty()
    .withMessage("firstName no puede quedar vacío")
    .isAlpha("es-ES")
    .withMessage("firstName debe tener sólo letras")
    .isLength({ min: 2, max: 50 })
    .withMessage("firstName debe tener un rango de 2-50 caracteres"),
  body("profile.lastName")
    .notEmpty()
    .withMessage("lastName no puede quedar vacío")
    .isAlpha("es-ES")
    .withMessage("lastName debe tener sólo letras")
    .isLength({ min: 2, max: 50 })
    .withMessage("lastName debe tener un rango de 2-50 caracteres"),
  body("profile.birthDate")
    .optional()
    .isDate()
    .withMessage("birthDate debe seguir su formato")
    .custom((birthDate) => {
      if (new Date(birthDate) > new Date()) {
        throw new Error("birthDate no puede ser una fecha futura");
      }
      return true;
    }),
  body("profile.phone")
    .optional()
    .isNumeric()
    .withMessage("phone debe estar compuesto por números")
    .isLength({ min: 8, max: 15 })
    .withMessage("phone debe estar en el rango de 8-15 caracteres"),
];

export const updateUserValidation = [
  body("username")
    .optional()
    .notEmpty()
    .withMessage("username no puede estar vacío")
    .isAlphanumeric()
    .withMessage("username debe estar en alfanumerico")
    .isLength({ min: 3, max: 20 })
    .withMessage("username debe estar en un rango de 3-20 caracteres")
    .custom(async (username, { req }) => {
      const existing = await UserModel.findOne({
        username,
        _id: { $ne: req.params.id },
      });
      if (existing) {
        throw new Error("El username ya está en uso.");
      }
      return true;
    }),

  body("email")
    .optional()
    .notEmpty()
    .withMessage("email no puede estar vacío")
    .isEmail()
    .withMessage("email debe cumplir el formato")
    .custom(async (email, { req }) => {
      const existing = await UserModel.findOne({
        email,
        _id: { $ne: req.params.id },
      });
      if (existing) {
        throw new Error("Ya existe un user con ese email");
      }
      return true;
    }),
  body("password")
    .optional()
    .notEmpty()
    .withMessage("Password no puede estar vacío")
    .isStrongPassword({
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 0,
    })
    .withMessage(
      "password debe tener mínimo 8 caracteres, una mayúscula, una minúscula y un número",
    ),
  body("role")
    .optional()
    .isIn(["user", "admin"])
    .withMessage("El role debe ser 'user' o 'admin'"),
];

export const updateProfileValidation = [
  body("profile.firstName")
    .optional()
    .notEmpty()
    .withMessage("firstName no puede quedar vacío")
    .isAlpha("es-ES")
    .withMessage("firstName debe tener sólo letras")
    .isLength({ min: 2, max: 50 })
    .withMessage("firstName debe tener un rango de 2-50 caracteres"),
  body("profile.lastName")
    .optional()
    .notEmpty()
    .withMessage("lastName no puede quedar vacío")
    .isAlpha("es-ES")
    .withMessage("lastName debe tener sólo letras")
    .isLength({ min: 2, max: 50 })
    .withMessage("lastName debe tener un rango de 2-50 caracteres"),
  body("profile.birthDate")
    .optional()
    .isDate()
    .withMessage("birthDate debe seguir su formato")
    .custom((birthDate) => {
      if (new Date(birthDate) > new Date()) {
        throw new Error("birthDate no puede ser una fecha futura");
      }
      return true;
    }),
  body("profile.phone")
    .optional()
    .isNumeric()
    .withMessage("phone debe estar compuesto por números")
    .isLength({ min: 8, max: 15 })
    .withMessage("phone debe estar en el rango de 8-15 caracteres"),
];

export const userIdValidation = [
  param("id").isMongoId().withMessage("El id no es un ObjectId válido"),
];
