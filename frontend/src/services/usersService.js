import api from './apiConfig';

export const getEmployee = async () => {
    try {
        const response = await api.get('/obterUsua');
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

// Mudar
export const postProcess = async (data) => {
  try{
    const response = await api.post("/process", data);
    console.log(response.data)
    return response.data
  } catch (error){
    console.error('Erro ao cadastrar o processo:', error);
  }
}

// Mudar
export const editEmployee = async (id) => {
  try{
    const response = await api.put(`/atualizarUsua/:${id}`)
    return response.data
  } catch (error){
    console.error('Erro ao atualizar as informações do usuário:', error);
  }
}

export const getAttorneys = async() => {
  try {
    const procur = await api.get('/procuradores');
    console.log(procur.data);
    return procur.data;
  } catch (error) {
      console.log(error);
  }
}

export const getOneAttorneys = async (id) => {
  try {
    const response = await api.get(`/obterUsua/:${id}`)
    return response.data
  } catch (error) {
    console.error('Erro ao pegar as informações do usuário:', error);
  }
}