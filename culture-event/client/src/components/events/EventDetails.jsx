import React from 'react';
import './EventDetails.css';

function EventDetails({ event }) {
  if (!event) {
    return (
      <section className="event-details event-details--empty">
        <h2 className="event-details__empty-title">Мероприятие не найдено</h2>
        <p className="event-details__empty-text">
          Похоже, информация о событии отсутствует или была удалена.
        </p>
      </section>
    );
  }

  const {
    title,
    date,
    time,
    location,
    category,
    image,
    description,
    organizer,
    price,
  } = event;

  return (
    <section className="event-details">
      <div className="event-details__media">
        <img
          className="event-details__image"
          src={image}
          alt={title}
        />
      </div>

      <div className="event-details__content">
        <div className="event-details__badge-row">
          <span className="event-details__badge">{category}</span>
          <span className="event-details__price">{price}</span>
        </div>

        <h1 className="event-details__title">{title}</h1>

        <div className="event-details__meta">
          <div className="event-details__meta-item">
            <span className="event-details__meta-label">Дата</span>
            <p className="event-details__meta-value">{date}</p>
          </div>

          <div className="event-details__meta-item">
            <span className="event-details__meta-label">Время</span>
            <p className="event-details__meta-value">{time}</p>
          </div>

          <div className="event-details__meta-item">
            <span className="event-details__meta-label">Место</span>
            <p className="event-details__meta-value">{location}</p>
          </div>

          <div className="event-details__meta-item">
            <span className="event-details__meta-label">Организатор</span>
            <p className="event-details__meta-value">{organizer}</p>
          </div>
        </div>

        <div className="event-details__description-block">
          <h2 className="event-details__section-title">О мероприятии</h2>
          <p className="event-details__description">{description}</p>
        </div>
      </div>
    </section>
  );
}

export default EventDetails;