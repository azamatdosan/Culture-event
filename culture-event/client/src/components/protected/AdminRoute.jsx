import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import './AdminRoute.css';

const AdminRoute = ({ children }) => {
  const { user, isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="admin-loader">
        <div className="spinner"></div>
        <p>Проверка прав администратора...</p>
      </div>
    );
  }

  // Шаг 1: Проверяем, авторизован ли вообще
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Шаг 2: Проверяем роль
  if (user?.role !== 'admin') {
    // Если это обычный пользователь, отправляем его на главную страницу
    // В идеале можно отправить на страницу 403 (Доступ запрещен)
    return <Navigate to="/" replace />;
  }

  return children;
};

export default AdminRoute;