import { matchedData } from "express-validator";
import { UserModel } from "../models/user.model.js";
import { EventModel } from "../models/event.model.js";
import { hashPassword } from "../helpers/bcrypt.helper.js";

export const getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.find({ deletedAt: null })
      .select("-password")
      .populate("events");

    return res
      .status(200)
      .json({ msg: "Usuarios encontrados correctamente", data: users });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};

export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await UserModel.findOne({ _id: id, deletedAt: null })
      .select("-password")
      .populate("events");

    if (!user) {
      return res.status(404).json({ msg: "Usuario no encontrado" });
    }

    return res.status(200).json({ msg: "Usuario encontrado", data: user });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id, password, profile, ...changes } = matchedData(req);

    if (password) {
      changes.password = await hashPassword(password);
    }

    if (profile) {
      for (const [key, value] of Object.entries(profile)) {
        changes[`profile.${key}`] = value;
      }
    }

    const result = await UserModel.updateOne(
      { _id: id, deletedAt: null },
      changes,
      { runValidators: true },
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ msg: "Usuario no encontrado" });
    }

    return res.status(200).json({ msg: "Usuario actualizado correctamente" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await UserModel.updateOne(
      { _id: id, deletedAt: null },
      { deletedAt: new Date() },
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ msg: "Usuario no encontrado" });
    }

    await EventModel.deleteMany({ organizer: id });

    return res.status(200).json({ msg: "Usuario eliminado exitosamente" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};
