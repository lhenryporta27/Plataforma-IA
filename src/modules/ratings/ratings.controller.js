import {
  rateQuestion,
  getAverageRating,
} from "./ratings.service.js";

export const rate = async (req, res) => {
  const userId = req.user.userId;
  const { questionId, value } = req.body;

  const rating = await rateQuestion({
    userId,
    questionId,
    value,
  });

  const average = await getAverageRating(questionId);

  res.json({
    success: true,
    message: "Rating registrado",
    data: {
      rating,
      average,
    },
  });
};