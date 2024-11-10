import axios from "axios";
import { Blog, BlogInput, Category, LoginResponse } from "./types";

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URI,
});

export const fetchBlogs = async (
  category: string,
  token?: string
): Promise<Blog[]> => {
  const response = await api.get(`api/blog/all/${category}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const fetchCategories = async (): Promise<Category[]> => {
  const response = await api.get("/api/blog/categories");

  return response.data;
};

export const createBlog = async (data: BlogInput, token?: string) => {
  const response = await api.post("/api/blog/create", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  console.log(response);
  return response.data;
};
export const loginUser = async (
  email: string,
  password: string
): Promise<LoginResponse> => {
  const response = await api.post("/api/user/login", { email, password });
  console.log(response)
  return response.data;
};

export const registerUser = async (
  name: string,
  email: string,
  password: string,
  profilePic: File | null

): Promise<LoginResponse> => {

  const formData = new FormData();
  formData.append("email", email);
  formData.append("password", password);
  formData.append("name", name);
  profilePic && formData.append("file", profilePic);
  const response = await api.post("/api/user/register", formData);
  return response.data;
};
