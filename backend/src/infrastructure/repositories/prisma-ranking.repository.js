import prisma from "../../config/db.js";

export class PrismaRankingRepository {
  async getTopQuestions() {
    const questions = await prisma.question.findMany({
      include: {
        user: {
          select: {
            id: true,
            name: true,
          },
        },
        ratings: true,
      },
    });

    const withAverage = questions.map((q) => {
      const total = q.ratings.reduce((acc, r) => acc + r.value, 0);
      const avg = q.ratings.length ? total / q.ratings.length : 0;

      return {
        ...q,
        averageRating: avg,
      };
    });

    return withAverage.sort((a, b) => b.averageRating - a.averageRating);
  }

  async getTopUsers() {
    const users = await prisma.user.findMany({
      include: {
        questions: {
          include: {
            ratings: true,
          },
        },
      },
    });

    const result = users.map((user) => {
      let totalStars = 0;

      user.questions.forEach((q) => {
        q.ratings.forEach((r) => {
          totalStars += r.value;
        });
      });

      return {
        id: user.id,
        name: user.name,
        email: user.email,
        totalStars,
      };
    });

    return result
      .sort((a, b) => b.totalStars - a.totalStars)
      .slice(0, 10);
  }
}