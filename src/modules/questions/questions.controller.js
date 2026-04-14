import {
  createQuestion,
  getQuestionsByCourse,
  getQuestionById,
} from "./questions.service.js";

export const create = async (req, res) => {
  const userId = req.user.userId;

  const question = await createQuestion({
    ...req.body,
    userId,
  });

  res.status(201).json({
    success: true,
    message: "Pregunta creada correctamente",
    data: question,
  });
};

export const getByCourse = async (req, res) => {
  const { courseId } = req.params;
  const { page = 1, limit = 10 } = req.query;

  const result = await getQuestionsByCourse(courseId, {
    page: Number(page),
    limit: Number(limit),
  });

  res.json({
    success: true,
    data: result.data,   // 🔥 IMPORTANTE
    meta: result.meta,   // 🔥 IMPORTANTE
  });
};

export const getDetail = async (req, res) => {
  const { id } = req.params;

  const question = await getQuestionById(id);

  res.json({
    success: true,
    data: question,
  });
};