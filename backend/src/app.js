import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import "express-async-errors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

// 🔐 Middlewares
import { protect } from "./middleware/auth.middleware.js";
import { errorHandler } from "./middleware/error.middleware.js";

// 🔥 ROUTES HEXAGONALES (questions)
import questionsRoutes from "./interfaces/http/routes/questions.routes.js";

// 🔵 (Opcional: puedes seguir usando los otros módulos antiguos)
import authRoutes from "./interfaces/http/routes/auth.routes.js";
import coursesRoutes from "./interfaces/http/routes/courses.routes.js";
import ratingsRoutes from "./interfaces/http/routes/ratings.routes.js";
import rankingRoutes from "./interfaces/http/routes/ranking.routes.js";

dotenv.config();

const app = express();

// 🔐 Seguridad
app.use(helmet());

app.use(
  cors({
    origin: "*",
  })
);

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
    message: "API Hexagonal funcionando correctamente 🚀",
  });
});

// 🔒 Ruta de prueba protegida
app.get("/api/private", protect, (req, res) => {
  res.json({
    success: true,
    message: "Acceso permitido 🔒",
    user: req.user,
  });
});

// 📚 Rutas

// 🔵 módulos antiguos (pueden seguir igual)
app.use("/api/auth", authRoutes);
app.use("/api/courses", coursesRoutes);
app.use("/api/ratings", ratingsRoutes);
app.use("/api/ranking", rankingRoutes);

// 🔥 módulo HEXAGONAL (questions)
app.use("/api/questions", questionsRoutes);

// ⚠️ Manejo de errores SIEMPRE al final
app.use(errorHandler);

export default app;