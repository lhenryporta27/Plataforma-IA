import API from "./axios";

export const getTopUsers = async () => {
  const res = await API.get("/ranking/users");

  // 🔥 AQUÍ ESTÁ LA CORRECCIÓN
  return res.data.data;
};