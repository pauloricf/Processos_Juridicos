import React, { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ element }) => {
  const { user } = useContext(AuthContext);

  // Verifique se o usuário está no contexto ou se o token existe no localStorage
  const isAuthenticated = user || localStorage.getItem("token");

  return isAuthenticated ? element : <Navigate to="/login" />;
};

export default PrivateRoute;
