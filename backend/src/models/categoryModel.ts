import mongoose from "mongoose";
import { Category } from "../dto/blog";

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const categoryModel = mongoose.model<Category & mongoose.Document>(
  "Category",
  categorySchema
);

export { categoryModel };
