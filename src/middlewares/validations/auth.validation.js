import { body } from "express-validator";

export const loginValidation = [
  body("email")
    .notEmpty()
    .withMessage("email no puede estar vacío")
    .isEmail()
    .withMessage("email debe tener un formato válido"),
  body("password").notEmpty().withMessage("password no puede estar vacío"),
];
