import { matchedData } from "express-validator";
import { UserModel } from "../models/user.model.js";
import { hashPassword, comparePassword } from "../helpers/bcrypt.helper.js";
import { generateToken } from "../helpers/jwt.helper.js";

export const register = async (req, res) => {
  try {
    const validatedData = matchedData(req);

    const hashedPassword = await hashPassword(validatedData.password);

    const user = await UserModel.create({
      ...validatedData,
      password: hashedPassword,
    });

    return res.status(201).json({
      msg: "Usuario registrado exitosamente",
      data: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = matchedData(req);

    const user = await UserModel.findOne({ email, deletedAt: null });
    if (!user) {
      return res.status(401).json({ msg: "Credenciales inválidas" });
    }

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ msg: "Credenciales inválidas" });
    }

    const token = generateToken({ id: user._id, role: user.role });

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60,
    });

    return res.status(200).json({
      msg: "Login exitoso",
      data: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};
