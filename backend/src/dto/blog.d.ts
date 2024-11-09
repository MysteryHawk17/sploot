import { Schema } from "mongoose";

export interface Blog {
  title: string;
  description: string;
  userId: Schema.Types.ObjectId;
  category: Schema.Types.ObjectId;
  link?: string;
}

export interface BlogInput {
  title: string;
  description: string;
  category: Schema.Types.ObjectId;
  link?: string;
}
export interface Category {
  name: string;
}
