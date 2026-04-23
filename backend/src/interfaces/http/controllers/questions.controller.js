import { PrismaQuestionRepository } from "../../../infrastructure/repositories/prisma-question.repository.js";

import { createQuestionUseCase } from "../../../application/use-cases/questions/create-question.usecase.js";
import { getQuestionsByCourseUseCase } from "../../../application/use-cases/questions/get-questions-by-course.usecase.js";
import { getQuestionByIdUseCase } from "../../../application/use-cases/questions/get-question-by-id.usecase.js";

const questionRepository = new PrismaQuestionRepository();

// 🔥 CREAR PREGUNTA
export const create = async (req, res) => {
  const userId = req.user.userId;

  const question = await createQuestionUseCase(
    {
      ...req.body,
      userId,
    },
    { questionRepository }
  );

  res.status(201).json({
    success: true,
    message: "Pregunta creada correctamente",
    data: question,
  });
};

// 🔥 LISTAR POR CURSO
export const getByCourse = async (req, res) => {
  const { courseId } = req.params;
  const { page = 1, limit = 10 } = req.query;

  const result = await getQuestionsByCourseUseCase(
    {
      courseId,
      page: Number(page),
      limit: Number(limit),
    },
    { questionRepository }
  );

  res.json({
    success: true,
    data: result.data,
    meta: result.meta,
  });
};

// 🔥 DETALLE DE PREGUNTA
export const getDetail = async (req, res) => {
  const { id } = req.params;

  const question = await getQuestionByIdUseCase(
    { questionId: id },
    { questionRepository }
  );

  res.json({
    success: true,
    data: question,
  });
};