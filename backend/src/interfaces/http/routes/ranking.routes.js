import { Router } from "express";
import { topQuestions, topUsers } from "../controllers/ranking.controller.js";

const router = Router();

router.get("/questions", topQuestions);
router.get("/users", topUsers);

export default router;