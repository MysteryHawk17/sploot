import { Request, Response } from "express";
import { ObjectId, Schema } from "mongoose";
import BlogService from "../services/blogService";
import { Blog, BlogInput } from "../dto/blog";

class BlogController {
  private blogService: BlogService;

  constructor() {
    this.blogService = new BlogService();
    this.createBlog = this.createBlog.bind(this);
    this.getAllBlogs = this.getAllBlogs.bind(this);
    this.getBlogById = this.getBlogById.bind(this);
    this.getAllBlogCategories = this.getAllBlogCategories.bind(this);
  }

  async createBlog(req: Request, res: Response) {
    try {
      const data: BlogInput = req.body;
      const userId = req.user?._id;
      if (!userId) {
        res.status(401).json({ message: "User Id required" });
        return;
      }
      const newData: Blog = {
        title: data.title,
        description: data.description,
        category: data.category,
        userId: userId,
        link: data.link,
      };
      const result = await this.blogService.createBlog(newData);
      res.status(result.status).json(result);
    } catch (error: any) {
      res
        .status(error.status || 500)
        .json({ message: error.message || "Internal Server Error" });
    }
  }

  async getAllBlogs(req: Request, res: Response) {
    try {
      const categoryId = req.params.id;

      if (!categoryId) {
        res.status(401).json({ message: "Id required for blog" });
      }

      const vCategoryId = categoryId as unknown as ObjectId;

      const blogs = await this.blogService.getAllBlogs(vCategoryId);
      res.status(200).json(blogs);
    } catch (error: any) {
      res
        .status(error.status || 500)
        .json({ message: error.message || "Internal Server Error" });
    }
  }

  async getBlogById(req: Request, res: Response) {
    try {
      const blogId = req.params.id;

      if (!blogId) {
        res.status(401).json({ message: "Id required for blog" });
      }

      const vBlogIdF = blogId as unknown as ObjectId;

      const blog = await this.blogService.getBlogById(vBlogIdF);
      res.status(200).json(blog);
    } catch (error: any) {
      res
        .status(error.status || 500)
        .json({ message: error.message || "Internal Server Error" });
    }
  }

  async getAllBlogCategories(req: Request, res: Response) {
    try {
      const categories = await this.blogService.getAllBlogCateogories();
      res.status(200).json(categories);
    } catch (error: any) {
      res
        .status(error.status || 500)
        .json({ message: error.message || "Internal Server Error" });
    }
  }
}

export default BlogController;
