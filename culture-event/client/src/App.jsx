// client/src/App.jsx
import React from 'react';
import { useLocation } from 'react-router-dom'; // Добавили хук для отслеживания URL
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import AppRouter from './router/AppRouter';
import { useAuth } from './hooks/useAuth';
import './App.css';
import EventDePage from './pages/EventDetailsPage';

function App() {
  const { isLoading } = useAuth();
  const location = useLocation(); // Получаем текущий адрес страницы

  // Проверяем, находимся ли мы на страницах авторизации
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';

  if (isLoading) {
    return <div>Загрузка приложения...</div>;
  }

  return (
    <div className="app-wrapper">
      {/* Показываем Header только если это НЕ страница авторизации */}
      {!isAuthPage && <Header />}
      
      {/* Если это авторизация, убираем отступы, чтобы фон был на весь экран */}
      <main className={isAuthPage ? "auth-main-content" : "main-content"}>
        <AppRouter />
      </main>
      
      {/* Показываем Footer только если это НЕ страница авторизации */}
      {!isAuthPage && <Footer />}
    </div>
  );
}

export default App;