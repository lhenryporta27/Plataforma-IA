export const getTopQuestionsUseCase = async (
  _,
  { rankingRepository }
) => {
  return await rankingRepository.getTopQuestions();
};