import { Router } from "express";
import userController from "../controllers/userController";
import { authMiddleware } from "../middleware/authMiddleware";
import { uploadHandler } from "../utils/multer";

const router = Router();

//user signup
router.post("/register",uploadHandler, userController.createUser);
//user login
router.post("/login", userController.loginUser);

//get user profile
router.get("/profile", authMiddleware, userController.getUserByUserId);

export default router;
