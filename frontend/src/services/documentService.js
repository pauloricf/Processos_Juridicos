import api from "./apiConfig";

export const getDocumentsByProcessId = async (id) => {
  try {
    const response = await api.get(`/documents/documents/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteDocument = async (id) => {
  try {
    const response = await api.delete(`/documents/documents/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
