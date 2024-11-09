"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const connectDB_1 = __importDefault(require("./db/connectDB"));
const dbConfig_1 = require("./config/dbConfig");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
const port = process.env.PORT || 8000;
app.get("/", (req, res) => {
    res.status(200).json({ message: "SERVER STARTED AND RUNNING" });
});
(0, connectDB_1.default)(dbConfig_1.MONGO_URI);
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
