import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import EventCard from '../components/events/EventCard';
import './FavoritesPage.css';

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) return;

        const response = await fetch('/api/favorites', {
          headers: { Authorization: `Bearer ${token}` }
        });

        const data = await response.json();

        if (response.ok) {
          const formattedFavorites = data.map((event) => ({
            ...event,
            isFavorite: true
          }));
          setFavorites(formattedFavorites);
        }
      } catch (error) {
        console.error('Ошибка загрузки избранного:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  return (
    <div className="favorites-page container">
      <div className="favorites-header">
        <h1>❤️ Мое избранное</h1>
        <p>Мероприятия, которые вы сохранили, чтобы не потерять</p>
      </div>

      {loading ? (
        <div className="loading-state">
          <div className="spinner"></div>
        </div>
      ) : favorites.length > 0 ? (
        <div className="favorites-grid">
          {favorites.map((event) => (
            <EventCard key={event._id} event={event} />
          ))}
        </div>
      ) : (
        <div className="empty-favorites">
          <div className="empty-icon">🤍</div>
          <h2>В избранном пока пусто</h2>
          <p>Перейдите в афишу и нажмите на сердечко, чтобы добавить сюда мероприятие.</p>
          <Link to="/events" className="go-to-events-btn">
            Смотреть афишу
          </Link>
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;