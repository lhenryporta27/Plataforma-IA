import API from "./axios";

export const createRating = async ({ value, questionId }) => {
  const res = await API.post("/ratings", {
    value,
    questionId,
  });

  return res.data;
};