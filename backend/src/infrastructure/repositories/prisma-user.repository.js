import prisma from "../../config/db.js";

export class PrismaUserRepository {
  async findByEmail(email) {
    return await prisma.user.findUnique({
      where: { email },
    });
  }

  async create(data) {
    return await prisma.user.create({
      data,
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
      },
    });
  }
}