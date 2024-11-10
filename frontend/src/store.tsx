import { create } from "zustand";
import { LoginResponse, Blog, Category } from "./types";

interface AppState {
  user: LoginResponse | null;
  blogs: Blog[];
  categories: Category[];
  selectedCategory: Category;
  setUser: (user: LoginResponse | null) => void;
  setBlogs: (blogs: Blog[]) => void;
  setCategories: (categories: Category[]) => void;
  setSelectedCategory: (category: Category) => void;
  logout: () => void;
}

const token = localStorage.getItem("token");
const user = localStorage.getItem("user");
const initialUser: LoginResponse | null = token ? { token: JSON.parse(token), user: JSON.parse(user || "") } : null;

export const useAppStore = create<AppState>((set) => ({
  user: initialUser,
  blogs: [],
  categories: [],
  selectedCategory: { _id: "", name: "", thumbnail: "" },
  setUser: (user: LoginResponse | null) => {
    if (user) {
      localStorage.setItem("token", JSON.stringify(user.token));
      localStorage.setItem("user", JSON.stringify(user.user))
    } else {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }
    set({ user });
  },
  setBlogs: (blogs: Blog[]) => set({ blogs }),
  setCategories: (categories: Category[]) => set({ categories }),
  setSelectedCategory: (category: Category) => set({ selectedCategory: category }),
  logout: () => {
    localStorage.removeItem("token");
    set({ user: null });
  }
}));
