import { getAllCourses } from "./courses.service.js";

export const getCourses = async (req, res) => {
  const courses = await getAllCourses();

  res.json({
    success: true,
    data: courses,
  });
};