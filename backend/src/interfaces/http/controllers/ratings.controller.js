import { PrismaRatingRepository } from "../../../infrastructure/repositories/prisma-rating.repository.js";

import { rateQuestionUseCase } from "../../../application/use-cases/ratings/rate-question.usecase.js";
import { getAverageRatingUseCase } from "../../../application/use-cases/ratings/get-average.usecase.js";

const ratingRepository = new PrismaRatingRepository();

export const rate = async (req, res) => {
  const userId = req.user.userId;
  const { questionId, value } = req.body;

  const rating = await rateQuestionUseCase(
    { userId, questionId, value },
    { ratingRepository }
  );

  const average = await getAverageRatingUseCase(
    { questionId },
    { ratingRepository }
  );

  res.json({
    success: true,
    message: "Rating registrado",
    data: {
      rating,
      average,
    },
  });
};