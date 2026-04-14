import prisma from "../../config/db.js";
import { analyzeQuestionWithAI } from "../ai/ai.service.js";

export const createQuestion = async ({ content, courseId, userId }) => {
  if (!content || !courseId) {
    const error = new Error("Contenido y curso son obligatorios");
    error.statusCode = 400;
    throw error;
  }

  const course = await prisma.course.findUnique({
    where: { id: courseId },
  });

  if (!course) {
    const error = new Error("El curso no existe");
    error.statusCode = 404;
    throw error;
  }

  let aiResult = {
    aiLevel: "pendiente",
    aiFeedback: "No se pudo generar el análisis automático en este momento.",
    aiImproved: content,
  };

  try {
    aiResult = await analyzeQuestionWithAI(content);
  } catch (error) {
    console.error("Error analizando pregunta con IA:", error.message);
  }

  const question = await prisma.question.create({
    data: {
      content,
      courseId,
      userId,
      aiLevel: aiResult.aiLevel,
      aiFeedback: aiResult.aiFeedback,
      aiImproved: aiResult.aiImproved,
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      course: true,
    },
  });

  return question;
};

export const getQuestionsByCourse = async (courseId, { page = 1, limit = 10 } = {}) => {
  const skip = (page - 1) * limit;

  const questions = await prisma.question.findMany({
    where: { courseId },
    include: {
      user: {
        select: {
          id: true,
          name: true,
        },
      },
      ratings: true,
    },
    skip,
    take: limit,
  });

  const total = await prisma.question.count({
    where: { courseId },
  });

  const questionsWithAverage = questions
    .map((question) => {
      const totalStars = question.ratings.reduce(
        (sum, rating) => sum + rating.value,
        0
      );

      const averageRating =
        question.ratings.length > 0
          ? totalStars / question.ratings.length
          : 0;

      return {
        ...question,
        averageRating,
      };
    })
    .sort((a, b) => b.averageRating - a.averageRating);

  return {
    data: questionsWithAverage,
    meta: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  };
};

export const getQuestionById = async (questionId) => {
  const question = await prisma.question.findUnique({
    where: { id: questionId },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      course: true,
      ratings: true,
    },
  });

  if (!question) {
    const error = new Error("Pregunta no encontrada");
    error.statusCode = 404;
    throw error;
  }

  const total = question.ratings.reduce((sum, rating) => sum + rating.value, 0);
  const averageRating = question.ratings.length > 0
    ? total / question.ratings.length
    : 0;

  return {
    ...question,
    averageRating,
  };
};