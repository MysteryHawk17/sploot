import React, { useState } from "react";
import { BlogInput } from "../types";
import { useAppStore } from "../store";

interface CreateBlogModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (blogInput: BlogInput) => void;
}

export default function CreateBlogModal({
  isOpen,
  onClose,
  onSubmit,
}: CreateBlogModalProps) {
  const [blogInput, setBlogInput] = useState<BlogInput>({
    title: "",
    description: "",
    category: "",
    link: "",
  });
  const [error, setError] = useState<string>("");
  const categories = useAppStore((state) => state.categories);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setBlogInput({ ...blogInput, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!blogInput.title || !blogInput.description || !blogInput.category) {
      setError("Please fill in all required fields.");
      return;
    }
    onSubmit(blogInput);
    setBlogInput({ title: "", description: "", category: "", link: "" });
    setError("");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-8 w-96">
        <h2 className="text-2xl font-bold mb-4 text-[#484848]">
          Create New Blog
        </h2>
        {error && <p className="text-[#FF5A5F] mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-[#767676]"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              required
              value={blogInput.title}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-[#767676] rounded-md shadow-sm focus:outline-none focus:ring-[#00A699] focus:border-[#00A699]"
            />
          </div>
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-[#767676]"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              required
              value={blogInput.description}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-[#767676] rounded-md shadow-sm focus:outline-none focus:ring-[#00A699] focus:border-[#00A699]"
              rows={3}
            ></textarea>
          </div>
          <div>
            <label
              htmlFor="category"
              className="block text-sm font-medium text-[#767676]"
            >
              Category
            </label>
            <select
              id="category"
              name="category"
              required
              value={blogInput.category}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-[#767676] rounded-md shadow-sm focus:outline-none focus:ring-[#00A699] focus:border-[#00A699]"
            >
              <option value="">Select a category</option>
              {categories
                .map((category, index) => (
                  <option key={index} value={category._id}>
                    {category.name}
                  </option>
                ))}
            </select>
          </div>
          <div>
            <label
              htmlFor="link"
              className="block text-sm font-medium text-[#767676]"
            >
              Link (optional)
            </label>
            <input
              type="url"
              id="link"
              name="link"
              value={blogInput.link}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-[#767676] rounded-md shadow-sm focus:outline-none focus:ring-[#00A699] focus:border-[#00A699]"
            />
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-[#767676] rounded-md text-[#767676] hover:bg-[#F7F7F7] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#767676]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#FF5A5F] hover:bg-[#FC642D] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF5A5F]"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
