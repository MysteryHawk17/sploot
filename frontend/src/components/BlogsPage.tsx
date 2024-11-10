import { useEffect } from "react";
import { useAppStore } from "../store";
import { fetchBlogs } from "../api";
import Menu from "./Menu";

import { useBlogData } from "../hooks/useBlogData";
import Header from "./Header";

export default function BlogsPage() {
  const { isInitializing } = useBlogData();
  const { blogs, selectedCategory, setBlogs, user } = useAppStore();

  useEffect(() => {
    const fetchBlogsForCategory = async () => {
      if (selectedCategory?._id && user?.token) {
        try {
          const fetchedBlogs = await fetchBlogs(
            selectedCategory._id,
            user.token
          );
          setBlogs(fetchedBlogs);
        } catch (error) {
          if (selectedCategory?._id && user?.token) {
            console.error(
              "Error fetching blogs for the selected category:",
              error
            );
          }
        }
      }
    };

    fetchBlogsForCategory();
  }, [selectedCategory, setBlogs, user]);

  if (isInitializing) {
    return (
      <div className="min-h-screen bg-[#F7F7F7] flex items-center justify-center">
        <div className="text-lg text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F7F7F7]">
      <Header />
      <Menu />
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-[#484848]">Blogs</h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.length>0?blogs.map((blog, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-[#484848] mb-2">
                {blog.title}
              </h2>
              <p className="text-[#767676] mb-4">{blog.description}</p>
              <p className="text-[#767676] mb-4">User: {blog.userId.email}</p>
              <a
                href={blog.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#00A699] hover:text-[#FC642D]"
              >
                Read More
              </a>
            </div>
          )):<><h2>No Blogs under the selected Category</h2></>}
        </div>
      </div>
    </div>
  );
}
