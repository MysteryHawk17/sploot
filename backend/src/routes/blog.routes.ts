import { Router } from "express";
import BlogController from "../controllers/blogController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();

const blogController = new BlogController();

//create new blog
router.post("/create", authMiddleware, blogController.createBlog);

//get all blogs with filter
router.get("/all/:id", authMiddleware, blogController.getAllBlogs);

//get particular blog

router.get("/blog/:id", authMiddleware, blogController.getBlogById);

/*get all categories
Ideally should be present in its own route folder
*/
router.get("/categories", blogController.getAllBlogCategories);

export default router;
