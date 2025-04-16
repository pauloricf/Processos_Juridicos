import React, { createContext, useEffect, useState } from "react";
import { login, logout } from "../services/authService";
import { useNavigate } from "react-router-dom";
import { setNavigate } from "../services/apiConfig";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const navigate = useNavigate();

  setNavigate(navigate);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");
    console.log("stored", storedUser);
    console.log("token", token);

    // Verifique se o 'storedUser' é um JSON válido antes de fazer o parse
    if (token && storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        if (parsedUser) {
          setUser(parsedUser);
        }
      } catch (error) {
        console.error("Erro ao tentar parsear o usuário:", error);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        setUser(null);
      }
    }
  }, []);

  const loginContext = async (data) => {
    try {
      const loggedUser = await login(data);

      if (loggedUser && loggedUser.token) {
        setUser(loggedUser);
        localStorage.setItem("user", JSON.stringify(loggedUser));
        localStorage.setItem("token", loggedUser.token);

        // Retorna a flag isDefaultPassword
        return { success: true, data: loggedUser, isDefaultPassword: loggedUser.isDefaultPassword };
      } else {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        return { success: false, error: "Credenciais inválidas" };
      }
    } catch (error) {
      console.log("Erro ao fazer login", error);
      return { success: false, error: error.message || "Erro ao fazer login" };
    }
  };

  const logoutContext = () => {
    logout();
    setUser(null); // Limpa o estado do usuário
    navigate("/login");
  };
  return <AuthContext.Provider value={{ user, loginContext, logoutContext }}>{children}</AuthContext.Provider>;
};

export default AuthContext;
