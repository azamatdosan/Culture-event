import React, { useState } from 'react';
import './ContactsPage.css'; // Убедись, что файл называется именно так

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSent, setIsSent] = useState(false); 
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/contacts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setIsSent(true); 
        setFormData({ name: '', email: '', message: '' });
      } else {
        alert('Ошибка сервера при отправке');
      }
    } catch (error) {
      console.error(error);
      alert('Ошибка при отправке: проверьте соединение с сервером');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-page">
      <div className="contact-header">
        <h1>Свяжитесь с нами</h1>
        <p>Остались вопросы или есть предложения о сотрудничестве? Напишите нам!</p>
      </div>

      <div className="contact-container">
        {/* ЛЕВАЯ КАРТОЧКА: КОНТАКТЫ */}
        <div className="contact-info-card">
          <h2>Контакты</h2>
          <div className="info-item">
            <span className="info-label">Адрес</span>
            <p>г. Астана, ул. Культурная, 15</p>
          </div>
          <div className="info-item">
            <span className="info-label">Телефон</span>
            <p>+7 (999) 123-45-67</p>
          </div>
          <div className="info-item">
            <span className="info-label">Email</span>
            <p>info@culture-event.kz</p>
          </div>
          <div className="info-item">
            <span className="info-label">Режим работы</span>
            <p>Пн–Пт: 10:00 – 19:00</p>
          </div>
        </div>

        {/* ПРАВАЯ КАРТОЧКА: ФОРМА ИЛИ УСПЕХ */}
        <div className="contact-form-card">
          {!isSent ? (
            <>
              <h2>Напишите нам</h2>
              <form onSubmit={handleSubmit}>
                <input 
                  type="text" 
                  placeholder="Ваше имя" 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required 
                />
                <input 
                  type="email" 
                  placeholder="Ваш email" 
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  required 
                />
                <textarea 
                  placeholder="Ваше сообщение" 
                  rows="5"
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  required
                ></textarea>
                <button type="submit" disabled={loading}>
                  {loading ? 'Отправка...' : 'Отправить'}
                </button>
              </form>
            </>
          ) : (
            <div className="success-animation">
              <div className="checkmark-circle">
                <div className="checkmark draw"></div>
              </div>
              <h3>Сообщение отправлено!</h3>
              <p>Спасибо за обращение. Мы свяжемся с вами в ближайшее время.</p>
              <button onClick={() => setIsSent(false)} className="back-btn">
                Отправить еще раз
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactPage;