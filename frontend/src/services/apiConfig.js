import axios from "axios";

let navigate; // Variável para armazenar a função de navegação do React Router

export const setNavigate = (navFunction) => {
  navigate = navFunction; // Função para configurar o `navigate`
};

const getBaseUrl = () => {
  const hostname = window.location.hostname;

  if (hostname === "localhost" || hostname === "127.0.0.1") {
    return "http://localhost:3035/api";
  }

  if (hostname.startsWith("192.168.")) {
    return `http://${hostname}:3035/api`;
  }

  // Caso contrário, use o IP fixo
  // return "http://192.169.137.112:3035/api";
  return "https://processos-juridicos-1n5z.vercel.app/api";
};

const baseURL = getBaseUrl();
const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
    "Cache-Control": "no-cache",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && (error.response.status === 403 || error.response.status === 401)) {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      if (navigate) {
        navigate("/login"); // Usa o React Router para redirecionar
      }
    }
    return Promise.reject(error);
  }
);

export default api;
