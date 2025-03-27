import React, { createContext, useEffect, useState } from "react";
import { login, logout } from "../services/authService";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const navigate = useNavigate();

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
      console.log("loggeduser", loggedUser);
      if (loggedUser && loggedUser.token) {
        setUser(loggedUser);
        localStorage.setItem("user", JSON.stringify(loggedUser));
        localStorage.setItem("token", loggedUser.token);
        console.log("Token armazenado:", loggedUser.token); // Log para verificar o token
      } else {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        alert("Credenciais inválidas");
      }

      return loggedUser;
    } catch (error) {
      console.log("Erro ao fazer login", error);
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
