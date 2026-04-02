import React, { useState, useEffect } from 'react';
import EventCard from '../components/events/EventCard';
import eventsBg from '../assets/images/events-bg.jpg'; // Импорт фоновой картинки
import './EventsPage.css';

// Список категорий для фильтра (как на твоем скрине)
const CATEGORIES = ['Все', 'Театр', 'Выставки', 'Концерты', 'Лекции', 'Кино'];

const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Состояния для поиска и фильтров
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Все');

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/events'); 
        
        if (!response.ok) {
          throw new Error('Ошибка при загрузке мероприятий');
        }
        
        const data = await response.json();
        setEvents(data);
      } catch (err) {
        console.error('Ошибка:', err);
        setEvents([]); 
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // УМНАЯ ФИЛЬТРАЦИЯ: фильтруем и по тексту, и по выбранной категории
  const filteredEvents = events.filter(event => {
    // 1. Проверка по тексту
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase());
    
    // 2. Проверка по категории (если выбрано 'Все', показываем всё)
    const matchesCategory = selectedCategory === 'Все' || 
                            event.category.toLowerCase().includes(selectedCategory.toLowerCase());
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="events-page">
      
      {/* 1. БАННЕР С ФОНОВОЙ КАРТИНКОЙ */}
      <section className="events-hero" style={{ backgroundImage: `url(${eventsBg})` }}>
        <div className="events-hero-overlay"></div>
        <div className="container events-hero-content">
          <h1 className="page-title">Афиша событий</h1>
        </div>
      </section>

      {/* 2. БЛОК ПОИСКА И КАТЕГОРИЙ (Стиль по твоему скрину) */}
      <section className="events-controls-section">
        <div className="container">
          <div className="controls-wrapper">
            
            {/* Совмещенная строка поиска и кнопка */}
            <div className="search-bar-wrapper">
              <input 
                type="text" 
                placeholder="Поиск по названию или месту..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
              <button className="search-btn">Найти</button>
            </div>

            {/* Фильтры-кнопки (Пиллсы) */}
            <div className="categories-wrapper">
              {CATEGORIES.map(category => (
                <button 
                  key={category}
                  className={`category-pill ${selectedCategory === category ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* 3. ОСНОВНОЙ КОНТЕНТ (КАРТОЧКИ) */}
      <div className="container events-content">
        {loading ? (
          <div className="loading-state">
            <div className="spinner"></div>
            <p>Загружаем афишу...</p>
          </div>
        ) : error ? (
          <div className="error-state">{error}</div>
        ) : filteredEvents.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">🎟️</div>
            <h2>События не найдены</h2>
            <p>По вашему запросу или выбранной категории пока ничего нет.</p>
          </div>
        ) : (
          <div className="events-grid">
            {filteredEvents.map(event => (
              <EventCard key={event._id || event.id} event={event} />
            ))}
          </div>
        )}
      </div>

    </div>
  );
};

export default EventsPage;