import { fetchApi } from './api';

export const eventService = {
  // Получить список всех мероприятий (с возможными фильтрами)
  getAllEvents: async (filters = {}) => {
    // Преобразуем объект фильтров в строку запроса (query string)
    // Например: { category: 'music' } -> ?category=music
    const queryString = new URLSearchParams(filters).toString();
    const endpoint = queryString ? `/events?${queryString}` : '/events';
    
    return await fetchApi(endpoint, {
      method: 'GET',
    });
  },

  // Получить конкретное мероприятие по ID
  getEventById: async (id) => {
    return await fetchApi(`/events/${id}`, {
      method: 'GET',
    });
  },

  // Создать новое мероприятие (Только для админа)
  createEvent: async (eventData) => {
    // Если eventData содержит FormData (например, картинку),
    // нам нужно убрать 'Content-Type': 'application/json' из api.js,
    // но для простоты пока предполагаем отправку JSON с URL картинки
    return await fetchApi('/events', {
      method: 'POST',
      body: JSON.stringify(eventData),
    });
  },

  // Обновить мероприятие (Только для админа)
  updateEvent: async (id, eventData) => {
    return await fetchApi(`/events/${id}`, {
      method: 'PUT',
      body: JSON.stringify(eventData),
    });
  },

  // Удалить мероприятие (Только для админа)
  deleteEvent: async (id) => {
    return await fetchApi(`/events/${id}`, {
      method: 'DELETE',
    });
  }
};