import { Router } from "express";
import { rate } from "./ratings.controller.js";
import { protect } from "../../middleware/auth.middleware.js";

const router = Router();

// 🔒 votar
router.post("/", protect, rate);

export default router;