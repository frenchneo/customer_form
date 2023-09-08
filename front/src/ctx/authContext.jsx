import React, { useState, createContext, useEffect } from "react";
import { errorAlert, successAlert } from "../helpers/notifications";

export const AuthContext = createContext({
  token: null,
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const trueToken = "mynameisjeff"; // Attention, ceci est un exemple, ne faites jamais ça en prod !!!!!

  useEffect(() => {
    const token = localStorage.getItem("token");
    // Attention, ceci est un exemple, ne faites jamais ça en prod !!!!!
    // Dans la vraie vie, vous devez vérifier le token côté serveur ;)
    if (token === trueToken) {
      setToken(token);
      setIsAuthenticated(true);
    }
  }, []);

  const login = (email, password) => {
    // Attention, ceci est un exemple, ne faites jamais ça en prod !!!!!
    if (email === "admin@web.ac" && password === "admin") {
      setToken(trueToken);
      localStorage.setItem("token", trueToken);
      setIsAuthenticated(true);
      successAlert("Vous êtes connecté");
      return;
    }
    errorAlert("Email ou mot de passe incorrect");
  };

  const logout = () => {
    setToken(null);
    setIsAuthenticated(false);
    localStorage.removeItem("token");
  };

  const contextValue = {
    token,
    isAuthenticated,
    login,
    logout,
  };
  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
