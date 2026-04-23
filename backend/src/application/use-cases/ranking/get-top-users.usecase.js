export const getTopUsersUseCase = async (
  _,
  { rankingRepository }
) => {
  return await rankingRepository.getTopUsers();
};