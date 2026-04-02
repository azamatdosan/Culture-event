import { useState, useCallback } from 'react';
import { useAuth } from './useAuth';

export const useFavorites = (initialFavorites = []) => {
  const [favorites, setFavorites] = useState(initialFavorites);
  const [isLoading, setIsLoading] = useState(false);
  const { isAuthenticated } = useAuth();

  const toggleFavorite = useCallback(async (eventId) => {
    if (!isAuthenticated) {
      alert('Пожалуйста, войдите в систему, чтобы добавлять в избранное');
      return;
    }

    setIsLoading(true);
    try {
      // TODO: Здесь будет запрос к вашему Node.js API (POST/DELETE /api/favorites)
      
      // Локальное обновление состояния (Оптимистичный UI)
      setFavorites(prev => {
        if (prev.includes(eventId)) {
          return prev.filter(id => id !== eventId); // Удаляем
        } else {
          return [...prev, eventId]; // Добавляем
        }
      });
    } catch (error) {
      console.error("Ошибка при обновлении избранного:", error);
    } finally {
      setIsLoading(false);
    }
  }, [isAuthenticated]);

  const checkIsFavorite = useCallback((eventId) => {
    return favorites.includes(eventId);
  }, [favorites]);

  return { 
    favorites, 
    toggleFavorite, 
    checkIsFavorite, 
    isFavoriteLoading: isLoading 
  };
};