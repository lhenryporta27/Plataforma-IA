import { PrismaRankingRepository } from "../../../infrastructure/repositories/prisma-ranking.repository.js";

import { getTopQuestionsUseCase } from "../../../application/use-cases/ranking/get-top-questions.usecase.js";
import { getTopUsersUseCase } from "../../../application/use-cases/ranking/get-top-users.usecase.js";

const rankingRepository = new PrismaRankingRepository();

// 🔥 TOP PREGUNTAS
export const topQuestions = async (req, res) => {
  const data = await getTopQuestionsUseCase(
    {},
    { rankingRepository }
  );

  res.json({
    success: true,
    data,
  });
};

// 🔥 TOP USUARIOS
export const topUsers = async (req, res) => {
  const data = await getTopUsersUseCase(
    {},
    { rankingRepository }
  );

  res.json({
    success: true,
    data,
  });
};