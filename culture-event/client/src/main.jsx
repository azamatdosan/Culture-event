// client/src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import App from './App';
import './index.css'; // Подключаем глобальные стили

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* BrowserRouter включает поддержку маршрутизации во всем приложении */}
    <BrowserRouter>
      {/* AuthProvider дает доступ к данным пользователя любому компоненту внутри */}
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);