import mongoose, { Schema } from "mongoose";
import { Blog } from "../dto/blog";

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    link: {
      type: String
    },
  },
  { timestamps: true }
);

const blogModel = mongoose.model<Blog & mongoose.Document>("Blog", blogSchema);

export { blogModel };
