import { useRef, useEffect, useState } from "react";
import { useAppStore } from "../store";
import { BlogInput } from "../types";
import { useCreateBlog } from "../hooks/useBlogData";
import CreateBlogModal from "./CreateBlogModel";
import { Pen, LogOut } from "lucide-react";

export default function Menu() {
  const { categories, selectedCategory, setSelectedCategory, logout, user } =
    useAppStore();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { createNewBlog } = useCreateBlog();

  useEffect(() => {
    const handleResize = () => {
      if (scrollRef.current) {
        scrollRef.current.scrollLeft = 0;
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleCreateBlog = async (blogInput: BlogInput) => {
    if (!user?.token) return;
    const response = await createNewBlog(blogInput, user.token);
    if (response) {
      setIsModalOpen(false);
    }
  };

  return (
    <header className="bg-white shadow-sm w-full border-b">
      <CreateBlogModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateBlog}
      />
      <div className="px-6 py-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex-shrink-0">
            <button
              onClick={() => setIsModalOpen(true)}
              className="lg:hidden bg-[#FF5A5F] text-white p-2 rounded-full hover:bg-[#FC642D] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF5A5F] mr-3"
            >
              <Pen size={20} />
            </button>
            <button
              onClick={() => setIsModalOpen(true)}
              className="hidden lg:block bg-[#FF5A5F] text-white px-4 py-2 rounded-md hover:bg-[#FC642D] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF5A5F]"
            >
              Create New Blog
            </button>
          </div>
          <div className="overflow-x-auto scrollbar-hide" ref={scrollRef}>
            <nav className="w-full min-w-max">
              <ul className="flex flex-1 items-center space-x-8">
                {categories.map((category, index) => (
                  <li key={index} className="flex-shrink-1">
                    <button
                      onClick={() => setSelectedCategory(category)}
                      className={`flex flex-col items-center space-y-2 group ${
                        selectedCategory._id === category._id
                          ? "text-black border-b-2 border-black pb-2"
                          : "text-gray-500 hover:text-black hover:border-b-2 hover:border-gray-200 pb-2"
                      }`}
                    >
                      <span className="w-10 h-10">
                        <img
                          src={category.thumbnail}
                          alt={category.name}
                          className="w-full h-full object-contain"
                        />
                      </span>
                      <span className="text-xs font-medium">
                        {category.name}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
          <div className="flex-shrink-0">
            <button
              onClick={logout}
              className="hidden lg:block px-4 py-2 bg-[#FF5A5F] text-white rounded-md hover:bg-[#FC642D] transition-colors duration-200"
            >
              Logout
            </button>
            <button
              onClick={logout}
              className="lg:hidden p-2 bg-[#FF5A5F] text-white rounded-full hover:bg-[#FC642D] transition-colors duration-200"
            >
              <LogOut size={20} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
