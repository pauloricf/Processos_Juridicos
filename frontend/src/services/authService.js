import api from "./apiConfig";

export const login = async(data) => {
  try {
    const response = await api.post("/login", data);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};


export const logout = () => {
  localStorage.removeItem("token")
  localStorage.removeItem("user")
}