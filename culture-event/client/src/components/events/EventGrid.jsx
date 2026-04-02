import React from 'react';
import './EventGrid.css';
import EventCard from './EventCard';

const demoEvents = [
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
    title: 'Городская выставка фотографий',
    date: '12 апреля 2026',
    location: 'Астана, Gallery Point',
    image: '/images/event-3.jpg',
  },
  {
    id: 4,
    title: 'Литературный вечер',
    date: '16 апреля 2026',
    location: 'Астана, Дом культуры',
    image: '/images/event-1.jpg',
  },
  {
    id: 5,
    title: 'Театральная премьера',
    date: '20 апреля 2026',
    location: 'Астана, City Theatre',
    image: '/images/event-2.jpg',
  },
  {
    id: 6,
    title: 'Открытая лекция о культуре города',
    date: '24 апреля 2026',
    location: 'Астана, Urban Center',
    image: '/images/event-3.jpg',
  },
];

function EventGrid({ events = demoEvents, title = 'Афиша мероприятий' }) {
  return (
    <section className="event-grid">
      <div className="event-grid__top">
        <h2 className="event-grid__title">{title}</h2>
        <p className="event-grid__subtitle">
          Найдите интересные культурные события города и выберите мероприятие по душе.
        </p>
      </div>

      {events.length > 0 ? (
        <div className="event-grid__list">
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      ) : (
        <div className="event-grid__empty">
          Пока мероприятий нет. Попробуйте зайти позже.
        </div>
      )}
    </section>
  );
}

export default EventGrid;