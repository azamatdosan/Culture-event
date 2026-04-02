import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="main-footer">
      <div className="footer-container">
        
        {/* Левая колонка: Описание */}
        <div className="footer-brand">
          <h3 className="footer-logo">Culture Event</h3>
          <p className="footer-description">
            Информационный сайт о культурных мероприятиях города. Находите концерты, выставки, лекции и другие события.
          </p>
        </div>

        {/* Центральная колонка: Навигация */}
        <div className="footer-links-group">
          <h4 className="footer-heading">Навигация</h4>
          <ul className="footer-links">
            <li><Link to="/">Главная</Link></li>
            <li><Link to="/events">Афиша</Link></li>
            <li><Link to="/news">Новости</Link></li>
            <li><Link to="/faq">FAQ</Link></li>
          </ul>
        </div>

        {/* Правая колонка: Контакты */}
        <div className="footer-links-group">
          <h4 className="footer-heading">Контакты</h4>
          <ul className="footer-links">
            <li><Link to="/contacts">Связаться с нами</Link></li>
            {/* МЕНЯЕМ ЗДЕСЬ: 
                Вместо <a href="mailto:..."> используем <Link to="...">.
                Так как пути /error-email не существует в AppRouter, 
                автоматически откроется твоя страница NotFoundPage.
            */}
            <li>
              <Link to="/not-found-email">support@culture-event.kz</Link>
            </li>
          </ul>
        </div>

      </div>
      
      {/* Самый низ футера (Копирайт) */}
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Culture Event. Все права защищены.</p>
      </div>
    </footer>
  );
};

export default Footer;