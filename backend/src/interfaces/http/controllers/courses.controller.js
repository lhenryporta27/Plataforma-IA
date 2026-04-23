import { PrismaCourseRepository } from "../../../infrastructure/repositories/prisma-course.repository.js";
import { getAllCoursesUseCase } from "../../../application/use-cases/courses/get-all-courses.usecase.js";

const courseRepository = new PrismaCourseRepository();

export const getCourses = async (req, res) => {
  const courses = await getAllCoursesUseCase(
    {},
    { courseRepository }
  );

  res.json({
    success: true,
    data: courses,
  });
};