import api from "./apiConfig";

export const getReports = async () => {
  const response = await api.get("/reports");
  return response.data;
}