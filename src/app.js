import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import "express-async-errors";
import { protect } from "./middleware/auth.middleware.js";
import coursesRoutes from "./modules/courses/courses.routes.js";
import questionsRoutes from "./modules/questions/questions.routes.js";
import ratingsRoutes from "./modules/ratings/ratings.routes.js";
import rankingRoutes from "./modules/ranking/ranking.routes.js";

import authRoutes from "./modules/auth/auth.routes.js";
import { errorHandler } from "./middleware/error.middleware.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "API de Plataforma IA funcionando correctamente",
  });
});

app.use("/api/auth", authRoutes);

app.use(errorHandler);

export default app;

app.get("/api/private", protect, (req, res) => {
  res.json({
    success: true,
    message: "Acceso permitido 🔒",
    user: req.user,
  });
});

app.use("/api/courses", coursesRoutes);

app.use("/api/questions", questionsRoutes);

app.use("/api/ratings", ratingsRoutes);

app.use("/api/ranking", rankingRoutes);