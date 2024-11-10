import { useEffect, useState } from "react";
import { useAppStore } from "../store";
import { createBlog, fetchBlogs, fetchCategories } from "../api";
import { BlogInput } from "../types";

export const useBlogData = () => {
  const setBlogs = useAppStore((state) => state.setBlogs);
  const user = useAppStore((state) => state.user);
  const setCategories = useAppStore((state) => state.setCategories);
  const setSelectedCategory = useAppStore((state) => state.setSelectedCategory);
  const [isInitializing, setIsInitializing] = useState(true);

  const loadBlogs = async () => {
    if (!isInitializing && user?.token) {
      try {
        const selectedCategory = useAppStore.getState().selectedCategory;
        if (selectedCategory?._id) {
          const blogs = await fetchBlogs(selectedCategory._id, user.token);
          setBlogs(blogs);
        }
      } catch (error) {
        if (!isInitializing) {
          console.error("Failed to load blogs:", error);
        }
      }
    }
  };

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const categories = await fetchCategories();
        setCategories(categories);
        if (categories.length > 0) {
          setSelectedCategory(categories[0]);
        }
      } catch (error) {
        console.error("Failed to load categories:", error);
      } finally {
        setIsInitializing(false);
      }
    };

    loadCategories();
  }, [setCategories, setSelectedCategory]);

  useEffect(() => {
    loadBlogs();
  }, [isInitializing, user]);

  return { isInitializing, refetchBlogs: loadBlogs };
};

export const useCreateBlog = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { refetchBlogs } = useBlogData();

  const createNewBlog = async (data: BlogInput, token?: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await createBlog(data, token);
      await refetchBlogs();
      return response;
    } catch (err) {
      setError("Failed to create blog");
      console.error("Error creating blog:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return { createNewBlog, isLoading, error };
};