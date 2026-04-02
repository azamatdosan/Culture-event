import React from 'react';
import './ContactInfo.css';

function ContactInfo() {
  return (
    <div className="contact-info">
      <h2 className="contact-info__title">Контакты</h2>

      <div className="contact-info__item">
        <span className="contact-info__label">Адрес</span>
        <p>г. Астана, ул. Культурная, 15</p>
      </div>

      <div className="contact-info__item">
        <span className="contact-info__label">Телефон</span>
        <a href="tel:+79991234567">+7 (999) 123-45-67</a>
      </div>

      <div className="contact-info__item">
        <span className="contact-info__label">Email</span>
        <a href="mailto:info@culture-event.kz">info@culture-event.kz</a>
      </div>

      <div className="contact-info__item">
        <span className="contact-info__label">Режим работы</span>
        <p>Пн–Пт: 10:00 – 19:00</p>
      </div>
    </div>
  );
}

export default ContactInfo;