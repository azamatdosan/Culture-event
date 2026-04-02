import React from 'react';
import { Link } from 'react-router-dom';
import './NewsCard.css';

const NewsCard = ({ id, title, date, excerpt, imageUrl }) => {
  return (
    <article className="news-card">
      <div className="news-card-image">
        {/* Заглушка, если картинка не передана */}
        <img src={imageUrl || '/images/event-1.jpg'} alt={title} />
      </div>
      <div className="news-card-content">
        <span className="news-card-date">{date}</span>
        <h3 className="news-card-title">{title}</h3>
        <p className="news-card-excerpt">{excerpt}</p>
        {/* React Router для перехода на полную новость */}
        <Link to={`/news/${id}`} className="news-card-link">
          Читать далее
        </Link>
      </div>
    </article>
  );
};

export default NewsCard;