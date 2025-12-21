import express from "express";
import { adminOnly, protect } from "../middlewares/authMiddleware";

const router = express.Router();

// User Management Routes
router.get("/", protect, adminOnly, getUser);
router.get("/:id", protect, getUserById);
router.delete("/:id", protect, adminOnly, deleteUser);

export default router;
