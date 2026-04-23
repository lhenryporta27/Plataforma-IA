import prisma from "../../config/db.js";

export class PrismaQuestionRepository {
  
  async create({ content, courseId, userId, aiResult }) {
    return await prisma.question.create({
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
  }

  async findCourseById(courseId) {
    return await prisma.course.findUnique({
      where: { id: courseId },
    });
  }

  async findByCourse(courseId, { page = 1, limit = 10 } = {}) {
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
  }

  async findById(questionId) {
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

    const total = question.ratings.reduce(
      (sum, rating) => sum + rating.value,
      0
    );

    const averageRating =
      question.ratings.length > 0
        ? total / question.ratings.length
        : 0;

    return {
      ...question,
      averageRating,
    };
  }
}