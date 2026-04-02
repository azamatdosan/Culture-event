import React from 'react';
import './AboutPage.css';

const AboutPage = () => {
  return (
    <div className="about-page container">
      <section className="about-hero">
        <h1 className="page-title">О проекте</h1>
        <p className="about-lead">
          Наш информационный сайт создан для того, чтобы объединить все культурные мероприятия в одном удобном месте[cite: 3].
        </p>
      </section>

      <section className="about-content">
        <div className="about-text">
          <h2>Наша миссия</h2>
          <p>
            Мы стремимся сделать культуру доступнее. Ежедневно в городе проходят десятки выставок, театральных постановок и мастер-классов. Наша платформа помогает жителям и гостям столицы быстро находить события, соответствующие их интересам.
          </p>
          <h2>Для кого этот сайт?</h2>
          <ul>
            <li>Для любителей искусства и музыки.</li>
            <li>Для семей, ищущих варианты активных выходных.</li>
            <li>Для организаторов мероприятий, желающих расширить аудиторию.</li>
          </ul>
        </div>
        <div className="about-image">
          <img src="/images/about.jpg" alt="Культурная жизнь" />
        </div>
      </section>
    </div>
  );
};

export default AboutPage;