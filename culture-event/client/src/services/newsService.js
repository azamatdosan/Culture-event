import { fetchApi } from './api';

export const newsService = {
  // Получить список всех новостей
  getAllNews: async () => {
    return await fetchApi('/news', {
      method: 'GET',
    });
  },

  // Получить конкретную новость по ID
  getNewsById: async (id) => {
    return await fetchApi(`/news/${id}`, {
      method: 'GET',
    });
  }
};