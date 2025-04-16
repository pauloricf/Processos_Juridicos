import api from "./apiConfig";

export const getAllProcess = async () => {
  try {
    const response = await api.get("/process");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const postProcess = async (data) => {
  try {
    const response = await api.post("/process", data);
    console.log(response.data);
    return response.data;
  } catch (error) {
    
    console.error("Erro ao cadastrar o processo:", error);
    throw error
  }
};

export const updateProcess = async (id, status) => {
  try {
    const response = await api.put(`/process/${id}`, status);
    return response.data;
  } catch (error) {
    console.error("Erro ao atualizar o status do processo:", error);
  }
};

export const getProcessById = async (id) => {
  try {
    const response = await api.get(`/process/${id}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar o processo:", error);
  }
};

export const getProcessesByAttorney = async (id) => {
  try {
    const response = await api.get(`/attorneys/${id}/processes`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar processos do procurador", error);
  }
};

export const deleteProcess = async (id) => {
  try {
    const response = await api.delete(`/process/${id}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao deletar o processo", error);
  }
};
