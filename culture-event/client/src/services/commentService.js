import { fetchApi } from './api';

export const commentService = {
  // Получить все комментарии для конкретного мероприятия
  getCommentsByEvent: async (eventId) => {
    return await fetchApi(`/comments/event/${eventId}`, {
      method: 'GET',
    });
  },

  // Добавить новый комментарий
  addComment: async (eventId, text) => {
    return await fetchApi('/comments', {
      method: 'POST',
      body: JSON.stringify({ eventId, text }),
    });
  },

  // Удалить комментарий (доступно автору или админу)
  deleteComment: async (commentId) => {
    return await fetchApi(`/comments/${commentId}`, {
      method: 'DELETE',
    });
  }
};