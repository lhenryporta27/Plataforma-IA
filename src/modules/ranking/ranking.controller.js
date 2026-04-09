import {
  getTopQuestions,
  getTopUsers,
} from "./ranking.service.js";

export const topQuestions = async (req, res) => {
  const data = await getTopQuestions();

  res.json({
    success: true,
    data,
  });
};

export const topUsers = async (req, res) => {
  const data = await getTopUsers();

  res.json({
    success: true,
    data,
  });
};