import React from 'react';
import './FavoriteList.css';
import EventCard from '../events/EventCard';

const demoFavorites = [
  {
    id: 1,
    title: 'Фестиваль современного искусства',
    date: '5 апреля 2026',
    location: 'Астана, Art Space',
    image: '/images/event-1.jpg',
  },
  {
    id: 2,
    title: 'Вечер живой музыки',
    date: '9 апреля 2026',
    location: 'Астана, Central Hall',
    image: '/images/event-2.jpg',
  },
  {
    id: 3,
    title: 'Театральная премьера',
    date: '20 апреля 2026',
    location: 'Астана, City Theatre',
    image: '/images/event-3.jpg',
  },
];

function FavoriteList({
  favorites = demoFavorites,
  title = 'Избранные мероприятия',
  description = 'Здесь собраны события, которые вы сохранили, чтобы быстро вернуться к ним позже.',
}) {
  return (
    <section className="favorite-list">
      <div className="favorite-list__header">
        <div className="favorite-list__header-content">
          <p className="favorite-list__label">Избранное</p>
          <h2 className="favorite-list__title">{title}</h2>
          <p className="favorite-list__description">{description}</p>
        </div>

        <div className="favorite-list__count">
          <span>{favorites.length}</span>
        </div>
      </div>

      {favorites.length > 0 ? (
        <div className="favorite-list__grid">
          {favorites.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      ) : (
        <div className="favorite-list__empty">
          <h3 className="favorite-list__empty-title">Список избранного пока пуст</h3>
          <p className="favorite-list__empty-text">
            Добавляйте интересные мероприятия в избранное, чтобы не потерять их.
          </p>
        </div>
      )}
    </section>
  );
}

export default FavoriteList;