// Базовый URL нашего будущего Node.js сервера
// В режиме разработки это обычно localhost:5000, в продакшене — реальный домен
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

/**
 * Универсальная функция для выполнения запросов к API
 */
export const fetchApi = async (endpoint, options = {}) => {
  const token = localStorage.getItem('token');
  
  // Базовые заголовки
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  // Если есть токен, добавляем его для авторизации
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  // Формируем итоговый объект настроек
  const config = {
    ...options,
    headers,
  };

  try {
    const response = await fetch(`${API_URL}${endpoint}`, config);
    
    // Пытаемся распарсить JSON (даже если ответ с ошибкой, сервер обычно возвращает JSON с описанием)
    const data = await response.json().catch(() => null);

    if (!response.ok) {
      // Выбрасываем понятную ошибку для обработки в компонентах/хуках
      throw new Error(data?.message || `Ошибка сервера: ${response.status}`);
    }

    return data;
  } catch (error) {
    console.error(`Ошибка API (${endpoint}):`, error);
    throw error;
  }
};