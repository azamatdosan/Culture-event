import { fetchApi } from './api';

export const authService = {
  // Регистрация нового пользователя (теперь принимает объект с firstName и lastName)
  register: async (userData) => {
    return await fetchApi('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  },

  // Вход в систему (получение токена)
  login: async (email, password) => {
    return await fetchApi('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  },

  // Получение профиля
  getMe: async () => {
    return await fetchApi('/auth/me', {
      method: 'GET',
    });
  }
};