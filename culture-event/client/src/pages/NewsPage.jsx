import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './NewsPage.css';

const NewsPage = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        // Запрашиваем новости с твоего бэкенда
        const res = await fetch('/api/news'); 
        const data = await res.json();
        if (res.ok) setNews(data);
      } catch (error) {
        console.error('Ошибка загрузки новостей:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, []);

  if (loading) return <div className="loading-state"><div className="spinner"></div></div>;

  return (
    <div className="news-page container mt-5">
      <div className="news-header-section">
        <h1>Новости и Статьи</h1>
        <p>Узнавайте первыми о главных культурных событиях нашего города</p>
      </div>

      <div className="news-grid">
        {news.length === 0 ? (
          <p className="empty-state">Новостей пока нет.</p>
        ) : (
          news.map((item) => (
            <Link to={`/news/${item._id}`} key={item._id} className="news-card">
              <div className="news-image-wrapper">
                <img 
                  src={item.imageUrl || 'https://via.placeholder.com/400x250?text=Новость'} 
                  alt={item.title} 
                />
              </div>
              <div className="news-content">
                <span className="news-date">
                  {new Date(item.createdAt || item.date).toLocaleDateString('ru-RU')}
                </span>
                <h3 className="news-title">{item.title}</h3>
                <p className="news-snippet">
                  {/* Обрезаем текст для превью */}
                  {item.content ? item.content.substring(0, 100) + '...' : ''}
                </p>
                <span className="read-more-link">Читать подробнее →</span>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default NewsPage;