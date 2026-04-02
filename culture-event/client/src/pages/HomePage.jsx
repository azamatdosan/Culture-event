import React from 'react';
import { Link } from 'react-router-dom';
import EventCard from '../components/events/EventCard';
import heroBg from '../assets/images/hero-bg.jpg';
import './HomePage.css';

const worldEvents = [
  { id: 1, category: 'МУЗЫКА • БЕЛЬГИЯ', title: 'Tomorrowland', date: '2026-07-17', imageUrl: 'https://avatars.mds.yandex.net/i?id=fbf3d55dccda433d6808678b2ab854f9_l-8354186-images-thumbs&n=13' },
  { id: 2, category: 'КИНО • ФРАНЦИЯ', title: 'Каннский кинофестиваль', date: '2026-05-12', imageUrl: 'https://cdn.profile.ru/wp-content/uploads/2025/05/kannskij-kinofestival.jpg' },
  { id: 3, category: 'СПОРТ • МИР', title: 'Олимпийские игры', date: '2026-02-06', imageUrl: 'https://cdn.culture.ru/images/15ecd1e4-7cac-5488-9e12-1809a1266662' },
  { id: 4, category: 'КУЛЬТУРА • БРАЗИЛИЯ', title: 'Карнавал в Рио', date: '2026-02-13', imageUrl: 'https://avatars.mds.yandex.net/i?id=016a72b711f369e3e2196f48cf62d47e_l-4034294-images-thumbs&n=13' },
  { id: 5, category: 'МОДА • США', title: 'Met Gala', date: '2026-05-04', imageUrl: 'https://avatars.mds.yandex.net/i?id=e19069cc90c1cc3bdae503013c1bbabc_l-2415930-images-thumbs&n=13' },
  { id: 6, category: 'ТРАДИЦИИ • ГЕРМАНИЯ', title: 'Октоберфест', date: '2026-09-19', imageUrl: 'https://irecommend.ru/sites/default/files/product-images/630714/7d49BqrRWatDOSnUVUf0aw.jpg' }
];

const HomePage = () => {
  return (
    <div className="home-page">
      
      {/* 1. ГЛАВНЫЙ БЛОК */}
      <section className="hero-section" style={{ backgroundImage: `url(${heroBg})` }}>
        <div className="hero-overlay"></div>
        <div className="hero-container">
          <div className="hero-card">
            <h1 className="hero-title">Culture Event</h1>
            <p className="hero-subtitle">
              Открывайте для себя лучшие культурные события города. Мы создаем удобное пространство для поиска спектаклей, концертов и выставок, которые вдохновляют.
            </p>
            <Link to="/events" className="hero-btn">Смотреть афишу</Link>
          </div>
        </div>
      </section>

      {/* 2. ПОЧЕМУ ВЫБИРАЮТ НАС */}
      <section className="features-section">
        <h2 className="section-title">Почему выбирают нас</h2>
        <div className="features-grid">
          
          <div className="feature-card">
            <div className="feature-icon">🎭</div>
            <h3 className="feature-title">Лучшие события</h3>
            <p className="feature-desc">Гарантируем самые интересные премьеры и эксклюзивные выставки.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">⭐</div>
            <h3 className="feature-title">Удобный выбор</h3>
            <p className="feature-desc">Подробное описание, честные отзывы и рейтинги мероприятий.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🛡️</div>
            <h3 className="feature-title">Безопасность</h3>
            <p className="feature-desc">Надежная система бронирования и гарантия подлинности билетов.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">💳</div>
            <h3 className="feature-title">Быстрая оплата</h3>
            <p className="feature-desc">Покупка билета в 2 клика онлайн без очередей и переплат.</p>
          </div>

        </div>
      </section>

      {/* Находим 3-ю секцию (Афиша) и проверяем класс div-а */}
<section className="events-preview-section">
  <h2 className="section-title">Мировое наследие</h2>
  <div className="home-events-grid"> {/* ПРОВЕРЬ ЭТОТ КЛАСС */}
    {worldEvents.map(event => (
      <EventCard key={event.id} event={event} />
    ))}
  </div>
</section>
      {/* 4. СТАТИСТИКА (МИНИМАЛИСТИЧНЫЙ ДИЗАЙН) */}
      <section className="about-section">
        <div className="about-container">
          <h2 className="section-title">Culture Event в цифрах</h2>
          <p className="about-description">
            Мы ежедневно обновляем нашу базу, чтобы вы не пропустили ни одного важного культурного события.
          </p>
          
          <div className="about-stats-grid">
            <div className="stat-card">
              <span className="stat-number">1+</span>
              <span className="stat-label">Мероприятий</span>
            </div>
            <div className="stat-card">
              <span className="stat-number">1+</span>
              <span className="stat-label">Пользователей</span>
            </div>
            <div className="stat-card">
              <span className="stat-number">1+</span>
              <span className="stat-label">Площадок</span>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default HomePage;