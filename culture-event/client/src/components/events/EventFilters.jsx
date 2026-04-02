import React from 'react';
import './EventFilters.css';

const defaultCategories = [
  'Все',
  'Концерты',
  'Выставки',
  'Театр',
  'Лекции',
  'Фестивали',
];

const defaultDates = [
  'Любая дата',
  'Сегодня',
  'Завтра',
  'На этой неделе',
  'В этом месяце',
];

const defaultCities = [
  'Все города',
  'Астана',
  'Алматы',
  'Шымкент',
  'Караганда',
];

function EventFilters({
  selectedCategory = 'Все',
  selectedDate = 'Любая дата',
  selectedCity = 'Все города',
  onCategoryChange,
  onDateChange,
  onCityChange,
  onReset,
  categories = defaultCategories,
  dates = defaultDates,
  cities = defaultCities,
}) {
  return (
    <section className="event-filters">
      <div className="event-filters__top">
        <div>
          <p className="event-filters__label">Фильтры</p>
          <h3 className="event-filters__title">Уточните поиск мероприятий</h3>
        </div>

        <button
          type="button"
          className="event-filters__reset"
          onClick={onReset}
        >
          Сбросить
        </button>
      </div>

      <div className="event-filters__grid">
        <div className="event-filters__group">
          <label className="event-filters__group-label" htmlFor="category">
            Категория
          </label>
          <select
            id="category"
            className="event-filters__select"
            value={selectedCategory}
            onChange={(event) =>
              onCategoryChange && onCategoryChange(event.target.value)
            }
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div className="event-filters__group">
          <label className="event-filters__group-label" htmlFor="date">
            Дата
          </label>
          <select
            id="date"
            className="event-filters__select"
            value={selectedDate}
            onChange={(event) =>
              onDateChange && onDateChange(event.target.value)
            }
          >
            {dates.map((date) => (
              <option key={date} value={date}>
                {date}
              </option>
            ))}
          </select>
        </div>

        <div className="event-filters__group">
          <label className="event-filters__group-label" htmlFor="city">
            Город
          </label>
          <select
            id="city"
            className="event-filters__select"
            value={selectedCity}
            onChange={(event) =>
              onCityChange && onCityChange(event.target.value)
            }
          >
            {cities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>
      </div>
    </section>
  );
}

export default EventFilters;