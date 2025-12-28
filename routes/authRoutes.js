import express from "express";
import axios from "axios";
import FormData from "form-data";
import {
  getUserProfile,
  loginUser,
  registerUser,
  updateUserProfile,
} from "../controllers/authController.js";
import { protect } from "../middlewares/authMiddleware.js";
import upload from "../middlewares/uploadMIddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", protect, getUserProfile);
router.put("/profile", protect, updateUserProfile);

// --- Updated Upload Route for ImgBB ---
router.post("/upload-image", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // ১. ImgBB API-te pathanor jonno FormData toiri
    const formData = new FormData();
    // memory buffer-ke base64 string-e convert kora ImgBB API-r jonno
    formData.append("image", req.file.buffer.toString("base64"));

    // ২. ImgBB-te POST request pathano (Environment Variable use kore)
    const response = await axios.post(
      `https://api.imgbb.com/1/upload?key=${process.env.IMGBB_API_KEY}`,
      formData,
      {
        headers: { ...formData.getHeaders() },
      },
    );

    // ৩. ImgBB theke pawa permanent URL frontend-e pathano
    if (response.data.success) {
      res.status(200).json({ imageUrl: response.data.data.url });
    } else {
      res.status(500).json({ message: "ImgBB upload failed" });
    }
  } catch (error) {
    console.error(
      "Upload error details:",
      error.response?.data || error.message,
    );
    res.status(500).json({ message: "Internal Server Error during upload" });
  }
});

export default router;
