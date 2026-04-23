import API from "./axios";

// 🔥 1. TRAER PREGUNTAS POR CURSO
export const getQuestionsByCourse = async (courseId) => {
  const res = await API.get(`/questions/course/${courseId}`);
  return res.data.data;
};

// 🔥 2. TRAER UNA PREGUNTA POR ID (DETALLE)
export const getQuestionById = async (id) => {
  const res = await API.get(`/questions/${id}`);
  return res.data.data;
};