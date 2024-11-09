import { Request, Response } from "express";
import UserService from "../services/userServices";
import { UserData, UserLoginData } from "../dto/user";

class UserController {
  async createUser(req: Request, res: Response) {
    try {
      const data: UserData = req.body;
      const user = await UserService.createUser(data);
      res.status(201).json(user);
    } catch (error: any) {
      res.status(error.status || 500).json({ message: error.message });
    }
  }

  async loginUser(req: Request, res: Response) {
    try {
      const data: UserLoginData = req.body;
      const user = await UserService.loginUser(data);
      res.status(200).json(user);
    } catch (error: any) {
      res.status(error.status || 500).json({ message: error.message });
    }
  }

  async getUserByUserId(req: Request, res: Response) {
    try {
      const id = req.user?._id;
      console.log(id);

      if (!id) {
        res.status(407).json({ message: "User id is required" });
        return;
      }
      const user = await UserService.getUserByUserId(id);
      if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
      }
      res.status(200).json(user);
    } catch (error: any) {
      res.status(error.status || 500).json({ message: error.message });
    }
  }
}

export default new UserController();
