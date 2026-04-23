import { Router } from "express";

import {
  create,
  getByCourse,
  getDetail,
} from "../controllers/questions.controller.js";

import { protect } from "../../../middleware/auth.middleware.js";
import { validate } from "../../../middleware/validate.middleware.js";

const router = Router();

// 🔒 CREAR PREGUNTA
router.post(
  "/",
  protect,
  validate({
    content: { required: true, minLength: 10 },
    courseId: { required: true },
  }),
  create
);

// 📚 LISTAR POR CURSO
router.get("/course/:courseId", getByCourse);

// 🔎 DETALLE DE PREGUNTA
router.get("/:id", getDetail);

export default router;