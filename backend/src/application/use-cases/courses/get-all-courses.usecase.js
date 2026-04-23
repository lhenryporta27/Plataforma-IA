export const getAllCoursesUseCase = async (
  _,
  { courseRepository }
) => {
  const courses = await courseRepository.findAll();

  return courses;
};