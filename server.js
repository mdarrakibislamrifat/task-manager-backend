import express from "express";
import cors from "cors";
import path from "path";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
// import taskRoutes from "./routes/taskRoutes.js";
// import reportRoutes from "./routes/reportRoutes.js";

dotenv.config();

const app = express();

// Middleware to handle cors
app.use(
  cors({
    origin: process.env.CLIENT_URL || "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/reports", reportRoutes);

// Start the server
const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Task Manager API is running");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
