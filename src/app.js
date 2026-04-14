import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import "express-async-errors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

import { protect } from "./middleware/auth.middleware.js";
import authRoutes from "./modules/auth/auth.routes.js";
import coursesRoutes from "./modules/courses/courses.routes.js";
import questionsRoutes from "./modules/questions/questions.routes.js";
import ratingsRoutes from "./modules/ratings/ratings.routes.js";
import rankingRoutes from "./modules/ranking/ranking.routes.js";
import { errorHandler } from "./middleware/error.middleware.js";

dotenv.config();

const app = express();

// 🔐 Seguridad
app.use(helmet());

app.use(cors({
  origin: "*", // luego puedes restringir
}));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

app.use(limiter);

// 📦 Body parser
app.use(express.json());

// 🧪 Ruta base
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "API de Plataforma IA funcionando correctamente",
  });
});

// 🔐 Ruta protegida de prueba
app.get("/api/private", protect, (req, res) => {
  res.json({
    success: true,
    message: "Acceso permitido 🔒",
    user: req.user,
  });
});

// 📚 Rutas
app.use("/api/auth", authRoutes);
app.use("/api/courses", coursesRoutes);
app.use("/api/questions", questionsRoutes);
app.use("/api/ratings", ratingsRoutes);
app.use("/api/ranking", rankingRoutes);

// ⚠️ Middleware de errores (SIEMPRE AL FINAL)
app.use(errorHandler);

export default app;