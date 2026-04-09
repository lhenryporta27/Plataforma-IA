import prisma from "../../config/db.js";

export const createQuestion = async ({ content, courseId, userId }) => {
  if (!content || !courseId) {
    const error = new Error("Contenido y curso son obligatorios");
    error.statusCode = 400;
    throw error;
  }

  const question = await prisma.question.create({
    data: {
      content,
      courseId,
      userId,
    },
  });

  return question;
};

export const getQuestionsByCourse = async (courseId) => {
  return await prisma.question.findMany({
    where: {
      courseId,
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};