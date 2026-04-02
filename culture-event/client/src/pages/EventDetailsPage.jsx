import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import './EventDetailsPage.css';

const EventDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  const [showBookModal, setShowBookModal] = useState(false);
  const [bookSuccess, setBookSuccess] = useState(false);
  const [buying, setBuying] = useState(false);

  const [showEditModal, setShowEditModal] = useState(false);
  const [editData, setEditData] = useState({});

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [bookError, setBookError] = useState('');

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await fetch(`/api/events/${id}`);
        const data = await res.json();

        if (res.ok) {
          setEvent(data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  const getValidToken = () => {
    return localStorage.getItem('token');
  };

  const handleOpenBookModal = () => {
    const token = getValidToken();

    if (!token) {
      alert('Пожалуйста, войдите в аккаунт для покупки билета');
      navigate('/login');
      return;
    }

    setBookError('');
    setShowBookModal(true);
  };

  const handleConfirmPurchase = async (e) => {
    e.preventDefault();
    setBuying(true);
    setBookError('');

    const token = getValidToken();

    if (!token) {
      setBookError('Ошибка сессии. Пожалуйста, перезайдите в аккаунт.');
      setBuying(false);
      return;
    }

    try {
      const res = await fetch(`/api/events/${id}/buy`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      });

      const data = await res.json();

      if (res.ok) {
        setBookSuccess(true);
        setBookError('');
      } else {
        setBookError(data.message || 'Произошла ошибка при бронировании.');
      }
    } catch (err) {
      setBookError('Ошибка при покупке. Проверьте подключение.');
    } finally {
      setBuying(false);
    }
  };

  const closeBookModal = () => {
    setShowBookModal(false);

    if (bookSuccess) {
      navigate('/profile');
    }
  };

  const handleOpenEditModal = () => {
    const formattedDate = new Date(event.date).toISOString().slice(0, 16);
    setEditData({ ...event, date: formattedDate });
    setShowEditModal(true);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();

    const token = getValidToken();

    if (!token) {
      alert('Ошибка авторизации. Перезайдите в аккаунт!');
      return;
    }

    try {
      const res = await fetch(`/api/events/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(editData)
      });

      const data = await res.json();

      if (res.ok) {
        setEvent(data);
        setShowEditModal(false);
      } else {
        alert(data.message || 'Ошибка обновления. Перезайдите в аккаунт.');
      }
    } catch (err) {
      alert('Ошибка при сохранении');
    }
  };

  const handleConfirmDelete = async () => {
    const token = getValidToken();

    if (!token) {
      alert('Ошибка авторизации. Перезайдите в аккаунт!');
      return;
    }

    try {
      const res = await fetch(`/api/events/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (!res.ok) {
        const data = await res.json();
        alert(data.message || 'Ошибка удаления');
        return;
      }

      setShowDeleteModal(false);
      navigate('/events');
    } catch (err) {
      alert('Ошибка при удалении');
    }
  };

  if (loading) {
    return (
      <div className="loading-state">
        <div className="spinner"></div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="container mt-5">
        <h2>Событие не найдено</h2>
      </div>
    );
  }

  return (
    <div className="event-details-page-v2">
      <div className="event-v2-container">
        <div className="event-v2-image-wrapper">
          <img src={event.imageUrl} alt={event.title} className="event-v2-image" />
        </div>

        <div className="event-v2-header">
          <h1 className="event-v2-title">{event.title}</h1>
          <div className="event-v2-price">
            {event.price === 0 ? 'Бесплатно' : `${event.price} ₸`}
          </div>
        </div>

        <div className="event-v2-meta">
          <span>📍 {event.location}</span>
          <span>📅 {new Date(event.date).toLocaleDateString('ru-RU')}</span>
        </div>

        {user?.role === 'admin' && (
          <div className="event-v2-admin-actions">
            <button className="admin-btn edit" onClick={handleOpenEditModal}>
              РЕДАКТИРОВАТЬ
            </button>
            <button className="admin-btn delete" onClick={() => setShowDeleteModal(true)}>
              УДАЛИТЬ
            </button>
          </div>
        )}

        <div className="event-v2-description">
          {event.description.split('\n').map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>

        <div className="event-v2-details-box">
          <p><strong>Категория:</strong> {event.category}</p>
          <p><strong>Место:</strong> {event.location}</p>
          <p><strong>Дата и время:</strong> {new Date(event.date).toLocaleString('ru-RU')}</p>
        </div>

        <button className="book-btn-v2" onClick={handleOpenBookModal}>
          ЗАБРОНИРОВАТЬ БИЛЕТ
        </button>
      </div>

      {showBookModal && (
        <div className="custom-modal-overlay">
          <div className="custom-modal">
            <button className="close-modal-btn" onClick={closeBookModal}>×</button>

            {bookSuccess ? (
              <div className="success-state-modal">
                <div className="success-check">✓</div>
                <h2>Оплата прошла успешно!</h2>
                <p>Билет на «{event.title}» добавлен в ваш профиль.</p>
                <button className="book-btn-v2" onClick={closeBookModal}>Отлично!</button>
              </div>
            ) : (
              <form onSubmit={handleConfirmPurchase} className="booking-form">
                <h2>Оформление билета</h2>
                <p className="booking-subtitle">{event.title}</p>

                {bookError && (
                  <div
                    style={{
                      padding: '12px',
                      backgroundColor: '#fee2e2',
                      color: '#991b1b',
                      borderRadius: '8px',
                      marginBottom: '15px',
                      textAlign: 'center',
                      fontSize: '0.9rem',
                      fontWeight: '500'
                    }}
                  >
                    {bookError}
                  </div>
                )}

                <div className="form-group">
                  <label>Покупатель</label>
                  <input
                    type="text"
                    value={user?.firstName || 'Пользователь'}
                    disabled
                    className="disabled-input"
                  />
                </div>

                <div className="form-group">
                  <label>Email для чека</label>
                  <input
                    type="email"
                    value={user?.email || ''}
                    disabled
                    className="disabled-input"
                  />
                </div>

                <button type="submit" className="book-btn-v2" disabled={buying}>
                  {buying ? 'Покупка...' : 'Подтвердить покупку'}
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {showEditModal && (
        <div className="custom-modal-overlay">
          <div className="custom-modal">
            <button className="close-modal-btn" onClick={() => setShowEditModal(false)}>×</button>

            <form onSubmit={handleEditSubmit} className="booking-form">
              <h2>Редактировать мероприятие</h2>

              <div className="form-group">
                <label>Название</label>
                <input
                  type="text"
                  value={editData.title || ''}
                  onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>Цена (₸)</label>
                <input
                  type="number"
                  value={editData.price || ''}
                  onChange={(e) => setEditData({ ...editData, price: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>Дата и время</label>
                <input
                  type="datetime-local"
                  value={editData.date || ''}
                  onChange={(e) => setEditData({ ...editData, date: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>Место проведения</label>
                <input
                  type="text"
                  value={editData.location || ''}
                  onChange={(e) => setEditData({ ...editData, location: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>Ссылка на картинку</label>
                <input
                  type="text"
                  value={editData.imageUrl || ''}
                  onChange={(e) => setEditData({ ...editData, imageUrl: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>Описание</label>
                <textarea
                  value={editData.description || ''}
                  onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                />
              </div>

              <button type="submit" className="book-btn-v2">
                Сохранить изменения
              </button>
            </form>
          </div>
        </div>
      )}

      {showDeleteModal && (
        <div className="custom-modal-overlay">
          <div className="custom-modal">
            <button className="close-modal-btn" onClick={() => setShowDeleteModal(false)}>×</button>
            <h2>Удалить мероприятие?</h2>
            <p>Это действие нельзя отменить.</p>
            <button className="admin-btn delete" onClick={handleConfirmDelete}>
              Подтвердить удаление
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventDetailsPage;