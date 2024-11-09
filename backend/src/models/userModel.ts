import mongoose from "mongoose";
import { UserData } from "../dto/user";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const userModel = mongoose.model<UserData & mongoose.Document>(
  "User",
  userSchema
);

export { userModel };
