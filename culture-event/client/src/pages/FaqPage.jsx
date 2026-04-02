import React, { useState } from 'react';
import './FaqPage.css';

const faqData = [
  {
    question: 'Как купить билет на мероприятие?',
    answer: 'Для покупки билета вам необходимо зарегистрироваться на сайте, перейти на страницу интересующего вас мероприятия и нажать кнопку "Купить билет" или "Забронировать". После этого следуйте инструкциям на экране.'
  },
  {
    question: 'Можно ли вернуть купленный билет?',
    answer: 'Да, возврат возможен не позднее чем за 24 часа до начала мероприятия. Деньги возвращаются на карту, с которой была произведена оплата, в течение 3-5 рабочих дней.'
  },
  {
    question: 'Как добавить мероприятие в "Избранное"?',
    answer: 'Эта функция доступна только авторизованным пользователям. Просто нажмите на иконку сердечка на карточке мероприятия, и оно появится в вашем личном кабинете в разделе "Избранное".'
  },
  {
    question: 'Я организатор. Как мне разместить свое событие на вашем сайте?',
    answer: 'Свяжитесь с нами через страницу "Контакты" или напишите на почту support@culture-event.kz. Наши менеджеры предоставят вам права Администратора для публикации афиш.'
  },
  {
    question: 'Нужно ли распечатывать электронный билет?',
    answer: 'Нет, распечатывать билет не обязательно. Достаточно показать QR-код с экрана вашего смартфона при входе на мероприятие.'
  }
];

const FaqPage = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFaq = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="faq-page">
      <div className="faq-header">
        <h1>Частые вопросы (FAQ)</h1>
        <p>Ответы на самые популярные вопросы о работе сервиса Culture Event</p>
      </div>
      
      <div className="faq-container">
        {faqData.map((item, index) => (
          <div 
            key={index} 
            className={`faq-item ${activeIndex === index ? 'active' : ''}`}
            onClick={() => toggleFaq(index)}
          >
            <div className="faq-question">
              <h3>{item.question}</h3>
              <span className="faq-icon">{activeIndex === index ? '−' : '+'}</span>
            </div>
            
            <div className="faq-answer-wrapper">
              <p className="faq-answer">{item.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FaqPage;