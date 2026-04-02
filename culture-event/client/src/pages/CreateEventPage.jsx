import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth'; 
import adminBg from '../assets/images/admin-bg.jpg';
import './CreateEventPage.css';

const CATEGORIES = ['Театр', 'Выставки', 'Концерты', 'Лекции', 'Кино'];

const CreateEventPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth(); 
  
  const [activeTab, setActiveTab] = useState('event'); // 'event' или 'news'
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  // Данные для Афиши
  const [eventData, setEventData] = useState({
    title: '', category: CATEGORIES[0], date: '', location: '', price: '', imageUrl: '', description: ''
  });

  // Данные для Новостей
  const [newsData, setNewsData] = useState({
    title: '', imageUrl: '', description: ''
  });

  const handleEventChange = (e) => {
    const { name, value } = e.target;
    setEventData(prev => ({ ...prev, [name]: value }));
  };

  const handleNewsChange = (e) => {
    const { name, value } = e.target;
    setNewsData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setError('');
  setSuccess(false);
  setLoading(true);

  try {
    const token = localStorage.getItem('token');

    if (!token) {
      throw new Error('Вы не авторизованы. Пожалуйста, войдите в аккаунт.');
    }

    const url = activeTab === 'event' ? '/api/events' : '/api/news';
    const payload = activeTab === 'event' ? eventData : newsData;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(payload)
    });

    const textResponse = await response.text();
    let data;

    try {
      data = JSON.parse(textResponse);
    } catch {
      throw new Error('Сервер ответил некорректно.');
    }

    if (!response.ok) {
      throw new Error(data.message || 'Ошибка сервера при сохранении');
    }

    setSuccess(true);

    if (activeTab === 'event') {
      setEventData({
        title: '',
        category: CATEGORIES[0],
        date: '',
        location: '',
        price: '',
        imageUrl: '',
        description: ''
      });
      setTimeout(() => navigate('/events'), 2000);
    } else {
      setNewsData({
        title: '',
        imageUrl: '',
        description: ''
      });
      setTimeout(() => navigate('/news'), 2000);
    }
  } catch (err) {
    console.error('Ошибка:', err);
    setError(err.message || 'Не удалось связаться с сервером.');
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="create-page" style={{ backgroundImage: `url(${adminBg})` }}>
      <div className="create-overlay"></div>
      
      <div className="container create-container">
        <div className="form-wrapper">
          
          <div className="tabs-wrapper">
            <button 
              className={`tab-btn ${activeTab === 'event' ? 'active' : ''}`}
              onClick={() => { setActiveTab('event'); setError(''); setSuccess(false); }}
            >
              🎉 Создать Афишу
            </button>
            <button 
              className={`tab-btn ${activeTab === 'news' ? 'active' : ''}`}
              onClick={() => { setActiveTab('news'); setError(''); setSuccess(false); }}
            >
              📰 Добавить Новость
            </button>
          </div>

          <div className="form-header">
            <h1 className="page-title">
              {activeTab === 'event' ? 'Новое мероприятие' : 'Новая статья'}
            </h1>
            <p className="page-subtitle">
              {activeTab === 'event' 
                ? 'Заполните данные для публикации события в афише' 
                : 'Опубликуйте свежую новость для ваших читателей'}
            </p>
          </div>

          {error && <div className="alert-message error">{error}</div>}
          {success && <div className="alert-message success">Успешно опубликовано! Перенаправление...</div>}

          <form onSubmit={handleSubmit} className="create-form">
            
            {activeTab === 'event' && (
              <>
                <div className="form-group full-width">
                  <label>Название мероприятия *</label>
                  <input type="text" name="title" value={eventData.title} onChange={handleEventChange} placeholder="Балет «Щелкунчик»" required />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Категория *</label>
                    <select name="category" value={eventData.category} onChange={handleEventChange} required>
                      {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Дата и время *</label>
                    <input type="datetime-local" name="date" value={eventData.date} onChange={handleEventChange} required />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Место проведения *</label>
                    <input type="text" name="location" value={eventData.location} onChange={handleEventChange} placeholder="Театр Абая" required />
                  </div>
                  <div className="form-group">
                    <label>Цена билета (₸) *</label>
                    <input type="number" name="price" value={eventData.price} onChange={handleEventChange} placeholder="0 для бесплатных" min="0" required />
                  </div>
                </div>

                <div className="form-group full-width">
                  <label>Ссылка на обложку (URL) *</label>
                  <input type="url" name="imageUrl" value={eventData.imageUrl} onChange={handleEventChange} placeholder="https://..." required />
                </div>

                <div className="form-group full-width">
                  <label>Описание *</label>
                  <textarea name="description" value={eventData.description} onChange={handleEventChange} rows="4" required></textarea>
                </div>
              </>
            )}

            {activeTab === 'news' && (
              <>
                <div className="form-group full-width">
                  <label>Заголовок новости *</label>
                  <input type="text" name="title" value={newsData.title} onChange={handleNewsChange} placeholder="Громкая премьера сезона..." required />
                </div>

                <div className="form-group full-width">
                  <label>Ссылка на картинку (URL) *</label>
                  <input type="url" name="imageUrl" value={newsData.imageUrl} onChange={handleNewsChange} placeholder="https://..." required />
                </div>

                <div className="form-group full-width">
                  <label>Текст новости *</label>
                  <textarea name="description" value={newsData.description} onChange={handleNewsChange} rows="6" placeholder="Напишите текст статьи..." required></textarea>
                </div>
              </>
            )}

            <button type="submit" className="submit-btn" disabled={loading || success}>
              {loading ? 'Отправка...' : 'Опубликовать'}
            </button>

          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateEventPage;