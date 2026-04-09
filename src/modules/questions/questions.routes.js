import { Router } from "express";
import { create, getByCourse } from "./questions.controller.js";
import { protect } from "../../middleware/auth.middleware.js";

const router = Router();

// 🔒 protegida
router.post("/", protect, create);

// pública
router.get("/:courseId", getByCourse);

export default router;