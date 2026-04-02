import React from 'react';
import './EventSearch.css';

function EventSearch({
  value = '',
  onChange,
  onSubmit,
  placeholder = 'Поиск мероприятий по названию, месту или формату',
}) {
  const handleSubmit = (event) => {
    event.preventDefault();

    if (onSubmit) {
      onSubmit(event);
    }
  };

  return (
    <section className="event-search">
      <div className="event-search__content">
        <p className="event-search__label">Поиск мероприятий</p>
        <h2 className="event-search__title">Найдите интересующее событие</h2>
        <p className="event-search__text">
          Используйте поиск, чтобы быстрее найти концерт, выставку, лекцию или
          другое культурное мероприятие в городе.
        </p>
      </div>

      <form className="event-search__form" onSubmit={handleSubmit}>
        <div className="event-search__input-wrapper">
          <svg
            className="event-search__icon"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M11 19a8 8 0 1 1 0-16 8 8 0 0 1 0 16Z"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="m21 21-4.35-4.35"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          <input
            className="event-search__input"
            type="text"
            value={value}
            onChange={onChange}
            placeholder={placeholder}
          />
        </div>

        <button className="event-search__button" type="submit">
          Найти
        </button>
      </form>
    </section>
  );
}

export default EventSearch;