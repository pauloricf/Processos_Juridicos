import api from './apiConfig';

export const getEmployee = async () => {
    try {
        const response = await api.get('/obterUsua');
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export const postProcess = async (data) => {
  try{
    const response = await api.post("/process", data);
    console.log(response.data)
    return response.data
  } catch (error){
    console.error('Erro ao cadastrar o processo:', error);
  }
}

export const editEmployee = async (id, status) => {
  try{
    const response = await api.put(`/atualizarUsua/:${id}`, status)
    return response.data
  } catch (error){
    console.error('Erro ao atualizar as informações do usuário:', error);
  }
}