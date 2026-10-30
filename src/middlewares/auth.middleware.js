import { verifyToken } from "../helpers/jwt.helper.js";
import { UserModel } from "../models/user.model.js";
import { EventModel } from "../models/event.model.js";

export const authMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ msg: "No autenticado" });
    }

    const decoded = verifyToken(token);

    const user = await UserModel.findOne({ _id: decoded.id, deletedAt: null });
    if (!user) {
      return res.status(401).json({ msg: "Usuario no válido" });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ msg: "Token inválido o vencido" });
  }
};

export const adminMiddleware = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res
      .status(403)
      .json({ msg: "Acceso denegado: se requiere rol admin" });
  }
  next();
};

export const ownerOrAdminMiddleware = async (req, res, next) => {
  try {
    const event = await EventModel.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ msg: "Evento no encontrado" });
    }

    const isOwner = event.organizer.toString() === req.user._id.toString();
    if (req.user.role !== "admin" && !isOwner) {
      return res.status(403).json({
        msg: "Solo el organizador o un admin puede realizar esta acción",
      });
    }

    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};
