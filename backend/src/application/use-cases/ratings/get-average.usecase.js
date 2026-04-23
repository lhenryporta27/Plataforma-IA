export const getAverageRatingUseCase = async (
  { questionId },
  { ratingRepository }
) => {

  if (!questionId) {
    const error = new Error("El questionId es obligatorio");
    error.statusCode = 400;
    throw error;
  }

  const average = await ratingRepository.getAverage(questionId);

  return average;
};