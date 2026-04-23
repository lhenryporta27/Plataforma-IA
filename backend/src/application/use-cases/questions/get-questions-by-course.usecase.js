export const getQuestionsByCourseUseCase = async (
  { courseId, page = 1, limit = 10 },
  { questionRepository }
) => {

  if (!courseId) {
    const error = new Error("El courseId es obligatorio");
    error.statusCode = 400;
    throw error;
  }

  const result = await questionRepository.findByCourse(courseId, {
    page,
    limit,
  });

  return result;
};