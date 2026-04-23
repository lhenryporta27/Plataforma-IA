import prisma from "../../config/db.js";

export class PrismaCourseRepository {
  async findAll() {
    return await prisma.course.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
  }
}