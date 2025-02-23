import api from './apiConfig';

export const getEmployee = async () => {
    try {
        const response = await api.get('/obterUsua');
        return response.data;
    } catch (error) {
        console.log(error);
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

export const deleteEmployee = async (id) => {
  try {
    const procur = await api.get(`/deleteUsua/:${id}`);
    console.log(procur.data);
    return procur.data;
  } catch (error) {
    console.log(error);
  }
}