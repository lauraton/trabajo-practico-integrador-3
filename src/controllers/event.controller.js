import { matchedData } from "express-validator";
import { EventModel } from "../models/event.model.js";

export const createEvent = async (req, res) => {
  try {
    const validatedData = matchedData(req);

    const event = await EventModel.create({
      ...validatedData,
      organizer: req.user._id,
    });

    return res
      .status(201)
      .json({ msg: "Evento creado exitosamente", data: event });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};

export const getAllEvents = async (req, res) => {
  try {
    const events = await EventModel.find()
      .populate("organizer", "username email")
      .populate("categories");

    return res
      .status(200)
      .json({ msg: "Eventos encontrados correctamente", data: events });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};

export const getMyEvents = async (req, res) => {
  try {
    const events = await EventModel.find({ organizer: req.user._id })
      .populate("organizer", "username email")
      .populate("categories");

    return res
      .status(200)
      .json({ msg: "Eventos encontrados correctamente", data: events });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};

export const getEventById = async (req, res) => {
  try {
    const { id } = req.params;

    const event = await EventModel.findById(id)
      .populate("organizer", "username email")
      .populate("categories");

    if (!event) {
      return res.status(404).json({ msg: "Evento no encontrado" });
    }

    return res.status(200).json({ msg: "Evento encontrado", data: event });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};

export const updateEvent = async (req, res) => {
  try {
    const { id, location, ...changes } = matchedData(req);

    if (location) {
      for (const [key, value] of Object.entries(location)) {
        changes[`location.${key}`] = value;
      }
    }

    const result = await EventModel.updateOne({ _id: id }, changes, {
      runValidators: true,
    });

    if (result.matchedCount === 0) {
      return res.status(404).json({ msg: "Evento no encontrado" });
    }

    return res.status(200).json({ msg: "Evento actualizado correctamente" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};

export const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;

    // Eliminación física
    const result = await EventModel.deleteOne({ _id: id });

    if (result.deletedCount === 0) {
      return res.status(404).json({ msg: "Evento no encontrado" });
    }

    return res.status(200).json({ msg: "Evento eliminado exitosamente" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};
