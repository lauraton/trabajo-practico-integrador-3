import { Router } from "express";
import {
  authMiddleware,
  ownerOrAdminMiddleware,
} from "../middlewares/auth.middleware.js";
import {
  getEventById,
  createEvent,
  deleteEvent,
  getAllEvents,
  getMyEvents,
  updateEvent,
} from "../controllers/event.controller.js";
import {
  createEventValidation,
  eventIdValidation,
  updateEventValidation,
} from "../middlewares/validations/event.validation.js";
import { validator } from "../middlewares/validator.middleware.js";

export const eventRouter = Router();

eventRouter.post(
  "/events",
  authMiddleware,
  createEventValidation,
  validator,
  createEvent,
);

eventRouter.get("/events", authMiddleware, getAllEvents);

eventRouter.get("/events/my", authMiddleware, getMyEvents);

eventRouter.get(
  "/events/:id",
  authMiddleware,
  eventIdValidation,
  validator,
  getEventById,
);

eventRouter.put(
  "/events/:id",
  authMiddleware,
  eventIdValidation,
  validator,
  ownerOrAdminMiddleware,
  updateEventValidation,
  validator,
  updateEvent,
);

eventRouter.delete(
  "/events/:id",
  authMiddleware,
  eventIdValidation,
  validator,
  ownerOrAdminMiddleware,
  deleteEvent,
);
