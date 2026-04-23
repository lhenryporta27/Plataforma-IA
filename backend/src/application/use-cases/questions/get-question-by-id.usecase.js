export const getQuestionByIdUseCase = async (
  { questionId },
  { questionRepository }
) => {

  if (!questionId) {
    const error = new Error("El questionId es obligatorio");
    error.statusCode = 400;
    throw error;
  }

  const question = await questionRepository.findById(questionId);

  return question;
};