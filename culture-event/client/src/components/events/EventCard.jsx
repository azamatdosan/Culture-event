import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import './EventCard.css';

const EventCard = ({ event }) => {
  // Вытаскиваем юзера и функцию его обновления напрямую из твоего AuthContext!
  const { user, setUser } = useAuth(); 
  const [isFavorite, setIsFavorite] = useState(false);

  // 1. Проверяем избранное (без ковыряния в localStorage)
  useEffect(() => {
    if (user && user.favorites) {
      setIsFavorite(user.favorites.some(id => String(id) === String(event._id)));
    } else {
      setIsFavorite(false);
    }
  }, [event._id, user]);

  // 2. Нажатие на сердечко
  const toggleFavorite = async (e) => {
    e.preventDefault(); 
    e.stopPropagation();

    // 🔴 ПРАВИЛЬНЫЙ ПОИСК ТОКЕНА (как написано в твоем AuthContext) 🔴
    const token = localStorage.getItem('token');

    if (!token) {
      alert("Пожалуйста, войдите в аккаунт");
      return;
    }

    try {
      const response = await fetch('/api/favorites', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ eventId: event._id }) 
      });

      if (response.ok) {
        const data = await response.json(); 
        setIsFavorite(!isFavorite);
        
        // Мгновенно обновляем юзера во всем сайте
        if (user) {
            setUser({ ...user, favorites: data.favorites });
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Link to={`/events/${event._id}`} className="event-card">
      <div className="event-image-wrapper">
        <img 
          src={event.imageUrl || 'https://via.placeholder.com/400x200?text=Нет+фото'} 
          alt={event.title} 
          className="event-image" 
        />
        <button 
          className={`favorite-btn ${isFavorite ? 'active' : ''}`} 
          onClick={toggleFavorite}
          title="Добавить в избранное"
        >
          {isFavorite ? '❤️' : '🤍'}
        </button>
      </div>
      
      <div className="event-content">
        <span className="event-category">{event.category}</span>
        <h3 className="event-title">{event.title}</h3>
        
        <div className="event-footer">
          <span className="event-date">
            {new Date(event.date).toLocaleDateString('ru-RU')}
          </span>
          <span className="event-price">
            {event.price === 0 ? 'Бесплатно' : `от ${event.price} ₸`}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default EventCard;