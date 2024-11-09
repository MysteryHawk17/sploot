import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./db/connectDB";
import { MONGO_URI } from "./config/dbConfig";

//routes import
import UserRoutes from "./routes/user.routes";
import BlogRoutes from "./routes/blog.routes";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
const port = process.env.PORT || 8000;

app.use("/api/user", UserRoutes);
app.use("/api/blog", BlogRoutes);

app.get("/", (req, res) => {
  res.status(200).json({ message: "SERVER STARTED AND RUNNING" });
});

connectDB(MONGO_URI);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
