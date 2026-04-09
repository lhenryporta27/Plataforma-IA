import {
  createQuestion,
  getQuestionsByCourse,
} from "./questions.service.js";

export const create = async (req, res) => {
  const userId = req.user.userId;

  const question = await createQuestion({
    ...req.body,
    userId,
  });

  res.status(201).json({
    success: true,
    message: "Pregunta creada",
    data: question,
  });
};

export const getByCourse = async (req, res) => {
  const { courseId } = req.params;

  const questions = await getQuestionsByCourse(courseId);

  res.json({
    success: true,
    data: questions,
  });
};