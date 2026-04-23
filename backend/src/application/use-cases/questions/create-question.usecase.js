import { analyzeQuestionWithAI } from "../../../infrastructure/ai/ai.service.js";

export const createQuestionUseCase = async (
  { content, courseId, userId },
  { questionRepository }
) => {
  if (!content || !courseId) {
    const error = new Error("Contenido y curso son obligatorios");
    error.statusCode = 400;
    throw error;
  }

  const course = await questionRepository.findCourseById(courseId);

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

  const question = await questionRepository.create({
    content,
    courseId,
    userId,
    aiResult,
  });

  return question;
};