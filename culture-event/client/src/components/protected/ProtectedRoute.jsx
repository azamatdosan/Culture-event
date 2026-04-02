import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth'; // Подтянем этот хук позже
import './ProtectedRoute.css';

const ProtectedRoute = ({ children }) => {
  // Получаем статус авторизации и состояние загрузки
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  // Пока проверяется токен, показываем заглушку
  if (isLoading) {
    return (
      <div className="protected-loader">
        <div className="spinner"></div>
        <p>Проверка доступа...</p>
      </div>
    );
  }

  // Если пользователь не авторизован, отправляем на страницу логина.
  // state={{ from: location }} позволяет вернуться на нужную страницу после входа.
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Если всё ок, рендерим вложенный компонент (страницу)
  return children;
};

export default ProtectedRoute;