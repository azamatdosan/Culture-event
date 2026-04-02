import { fetchApi } from './api';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const profileService = {
  // Обновить текстовые данные профиля (имя, телефон и т.д.)
  updateProfile: async (userData) => {
    return await fetchApi('/profile', {
      method: 'PUT',
      body: JSON.stringify(userData),
    });
  },

  // Загрузить новый аватар (работа с файлами)
  uploadAvatar: async (file) => {
    const formData = new FormData();
    formData.append('avatar', file); // 'avatar' — это имя поля, которое будет ждать Node.js (multer)

    const token = localStorage.getItem('token');

    // Здесь мы используем стандартный fetch напрямую, 
    // потому что браузер должен сам выставить правильный Content-Type (multipart/form-data) 
    // вместе с уникальным boundary (границей) для файла.
    const response = await fetch(`${API_URL}/profile/avatar`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
        // ВНИМАНИЕ: Content-Type здесь указывать НЕ НАДО!
      },
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(errorData?.message || 'Ошибка при загрузке аватара');
    }

    return await response.json();
  }
};