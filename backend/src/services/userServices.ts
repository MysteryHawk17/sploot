import { ObjectId } from "mongoose";
import { JWT_SECRET } from "../config/dbConfig";
import { UserData, UserLoginData } from "../dto/user";
import { userModel } from "../models/userModel";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

class UserService {
  async createUser(data: UserData) {
    const { name, email, password } = data;

    const findUser = await this.getUserByEmail(email);
    if (findUser) {
      throw { status: 409, message: "User already exists" };
    }

    const genSalt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, genSalt);

    const newUser = new userModel({
      email: email,
      password: hashedPassword,
      name: name,
    });

    const savedUser = await newUser.save();
    if (!savedUser) {
      throw { status: 500, message: "Failed to save user" };
    }

    if (!JWT_SECRET) {
      throw new Error("JWT_SECRET is not defined");
    }
    const token = jwt.sign({ _id: savedUser._id }, JWT_SECRET, {
      expiresIn: "24h",
    });
    return { token: token };
  }

  async loginUser(data: UserLoginData) {
    const findUser = await this.getUserByEmail(data.email);
    if (!findUser) {
      throw { status: 404, message: "User Not found" };
    }

    const comparePassword = await bcrypt.compare(
      data.password,
      findUser.password
    );
    if (!comparePassword) {
      throw { status: 401, message: "Incorrect password" };
    }

    if (!JWT_SECRET) {
      throw new Error("JWT_SECRET is not defined");
    }
    const token = jwt.sign({ _id: findUser._id }, JWT_SECRET, {
      expiresIn: "24h",
    });
    return { token: token };
  }

  private async getUserByEmail(email: string) {
    return userModel.findOne({ email: email });
  }

  async getUserByUserId(id: ObjectId) {
    return userModel.findById({ _id: id });
  }
}

export default new UserService();
