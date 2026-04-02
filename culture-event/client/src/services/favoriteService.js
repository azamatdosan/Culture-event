import { fetchApi } from './api';

export const favoriteService = {
  // Получить список избранных мероприятий текущего пользователя
  getFavorites: async () => {
    return await fetchApi('/favorites', {
      method: 'GET',
    });
  },

  // Добавить или удалить мероприятие из избранного (Toggle)
  toggleFavorite: async (eventId) => {
    return await fetchApi('/favorites/toggle', {
      method: 'POST',
      body: JSON.stringify({ eventId }),
    });
  }
};