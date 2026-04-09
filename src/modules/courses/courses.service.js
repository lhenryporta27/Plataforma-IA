import prisma from "../../config/db.js";

export const getAllCourses = async () => {
  return await prisma.course.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
};