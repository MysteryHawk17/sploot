import { ObjectId } from "mongoose";
import { Blog } from "../dto/blog";
import { blogModel } from "../models/blogModel";
import { categoryModel } from "../models/categoryModel";

class BlogService {
  async createBlog(data: Blog) {
    const doesCategoryExists = await categoryModel.findById({
      _id: data.category,
    });
    if (!doesCategoryExists) {
      throw { status: 422, message: "Incorrect CategoryId" };
    }
    const blog = new blogModel({
      title: data.title,
      description: data.description,
      userId: data.userId,
      category: data.category,
      link: data.link,
    });
    const savedBlog = await blog.save();
    if (!savedBlog) {
      throw { status: 501, message: "Failed to save Blog" };
    }
    return { status: 200, message: "Saved Blog successfully" };
  }

  async getAllBlogs(categoryId: ObjectId) {
    const doesCategoryExists = await categoryModel.findById({
      _id: categoryId,
    });
    if (!doesCategoryExists) {
      throw { status: 422, message: "Incorrect CategoryId" };
    }
    const findAllBlogs = await blogModel.find({ category: categoryId });
    if (!findAllBlogs) {
      throw { status: 404, message: "No Blogs Found" };
    }
    return findAllBlogs;
  }

  async getBlogById(id: ObjectId) {
    const findBlog = await blogModel.findById({ _id: id });
    if (!findBlog) {
      throw { status: 404, message: "Blog Not found" };
    }
    return findBlog;
  }
}

export default BlogService;
