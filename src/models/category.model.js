import { Types, model, Schema } from "mongoose";

const categorySchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    minlength: 2,
    maxlength: 30,
  },
  description: {
    type: String,
    maxlength: 200,
  },
});

export const CategoryModel = model("Category", categorySchema);
