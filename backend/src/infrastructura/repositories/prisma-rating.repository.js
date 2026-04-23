import prisma from "../../config/db.js";

export class PrismaRatingRepository {
  async findByUserAndQuestion(userId, questionId) {
    return await prisma.rating.findUnique({
      where: {
        userId_questionId: {
          userId,
          questionId,
        },
      },
    });
  }

  async create(data) {
    return await prisma.rating.create({
      data,
    });
  }

  async update(id, data) {
    return await prisma.rating.update({
      where: { id },
      data,
    });
  }

  async getAverage(questionId) {
    const result = await prisma.rating.aggregate({
      where: { questionId },
      _avg: {
        value: true,
      },
    });

    return result._avg.value || 0;
  }
}