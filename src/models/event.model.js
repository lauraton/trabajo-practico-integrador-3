import { Types, model, Schema } from "mongoose";

const eventSchema = new Schema({
  title: {
    type: String,
    unique: true,
    required: true,
    minlength: 3,
    maxlength: 150,
  },
  description: {
    type: String,
    required: true,
    minlength: 20,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  capacity: {
    type: Number,
    required: true,
    min: 1,
  },
  price: {
    type: Number,
    min: 0,
    default: 0,
  },
  status: {
    type: String,
    enum: ["scheduled", "cancelled", "finished"],
    default: "scheduled",
  },
  location: {
    venue: {
      type: String,
      minlength: 3,
      maxlength: 100,
      required: true,
    },
    address: {
      type: String,
      minlength: 5,
      maxlength: 150,
      required: true,
    },
    city: {
      type: String,
      minlength: 2,
      maxlength: 50,
      required: true,
    },
  },
});

export const EventModel = model("Event", eventSchema);
