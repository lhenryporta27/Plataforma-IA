import prisma from "../../config/db.js";

export const rateQuestion = async ({ userId, questionId, value }) => {
  if (!value || value < 1 || value > 5) {
    const error = new Error("El rating debe ser entre 1 y 5");
    error.statusCode = 400;
    throw error;
  }

  // verificar si ya votó
  const existingRating = await prisma.rating.findUnique({
    where: {
      userId_questionId: {
        userId,
        questionId,
      },
    },
  });

  // si ya votó → actualizar
  if (existingRating) {
    return await prisma.rating.update({
      where: { id: existingRating.id },
      data: { value },
    });
  }

  // si no votó → crear
  return await prisma.rating.create({
    data: {
      value,
      userId,
      questionId,
    },
  });
};

// 🔥 calcular promedio
export const getAverageRating = async (questionId) => {
  const result = await prisma.rating.aggregate({
    where: { questionId },
    _avg: {
      value: true,
    },
  });

  return result._avg.value || 0;
};