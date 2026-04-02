import React, { createContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        setUser(null);
        setIsAuthenticated(false);
        setIsLoading(false);
        return;
      }

      try {
        const userData = await authService.getMe();
        setUser(userData);
        setIsAuthenticated(true);
      } catch (error) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email, password) => {
    const data = await authService.login(email, password);

    localStorage.setItem('token', data.token);
    localStorage.removeItem('user');

    const userData = await authService.getMe();
    setUser(userData);
    setIsAuthenticated(true);
  };

  const register = async (userData) => {
    const data = await authService.register(userData);

    localStorage.setItem('token', data.token);
    localStorage.removeItem('user');

    const currentUser = await authService.getMe();
    setUser(currentUser);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        isAuthenticated,
        isLoading,
        login,
        register,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};