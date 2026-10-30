import { matchedData } from "express-validator";
import { CategoryModel } from "../models/category.model.js";
import { EventModel } from "../models/event.model.js";

export const createCategory = async (req, res) => {
  try {
    const validatedData = matchedData(req);

    const category = await CategoryModel.create(validatedData);

    return res
      .status(201)
      .json({ msg: "Categoría creada exitosamente", data: category });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};

export const getAllCategories = async (req, res) => {
  try {
    const categories = await CategoryModel.find();

    return res
      .status(200)
      .json({ msg: "Categorías encontradas correctamente", data: categories });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};

export const getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await CategoryModel.findById(id).populate({
      path: "events",
      select: "title description startDate endDate status",
    });

    if (!category) {
      return res.status(404).json({ msg: "Categoría no encontrada" });
    }

    return res
      .status(200)
      .json({ msg: "Categoría encontrada", data: category });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};

export const updateCategory = async (req, res) => {
  try {
    const { id, ...changes } = matchedData(req);

    const result = await CategoryModel.updateOne({ _id: id }, changes, {
      runValidators: true,
    });

    if (result.matchedCount === 0) {
      return res.status(404).json({ msg: "Categoría no encontrada" });
    }

    return res.status(200).json({ msg: "Categoría actualizada correctamente" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await CategoryModel.deleteOne({ _id: id });

    if (result.deletedCount === 0) {
      return res.status(404).json({ msg: "Categoría no encontrada" });
    }
    await EventModel.updateMany(
      { categories: id },
      { $pull: { categories: id } },
    );

    return res.status(200).json({ msg: "Categoría eliminada exitosamente" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};
