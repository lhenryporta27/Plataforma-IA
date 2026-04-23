export const rateQuestionUseCase = async (
  { userId, questionId, value },
  { ratingRepository }
) => {

  if (!value || value < 1 || value > 5) {
    const error = new Error("El rating debe ser entre 1 y 5");
    error.statusCode = 400;
    throw error;
  }

  const existingRating = await ratingRepository.findByUserAndQuestion(
    userId,
    questionId
  );

  if (existingRating) {
    return await ratingRepository.update(existingRating.id, { value });
  }

  return await ratingRepository.create({
    value,
    userId,
    questionId,
  });
};