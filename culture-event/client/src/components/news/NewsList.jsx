import React from 'react';
import NewsCard from './NewsCard';
import './NewsList.css';

const NewsList = ({ news }) => {
  // Защита от пустого массива или отсутствия данных
  if (!news || news.length === 0) {
    return (
      <div className="news-empty">
        <p>На данный момент новостей нет.</p>
      </div>
    );
  }

  return (
    <div className="news-list">
      {news.map((item) => (
        <NewsCard
          key={item.id}
          id={item.id}
          title={item.title}
          date={item.date}
          excerpt={item.excerpt}
          imageUrl={item.imageUrl}
        />
      ))}
    </div>
  );
};

export default NewsList;