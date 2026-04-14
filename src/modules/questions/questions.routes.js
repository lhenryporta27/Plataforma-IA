import { Router } from "express";
import { create, getByCourse, getDetail } from "./questions.controller.js";
import { protect } from "../../middleware/auth.middleware.js";
import { validate } from "../../middleware/validate.middleware.js";

const router = Router();

router.post(
  "/",
  protect,
  validate({
    content: { required: true, minLength: 10 },
    courseId: { required: true },
  }),
  create
);
router.get("/course/:courseId", getByCourse);
router.get("/:id", getDetail);

export default router;