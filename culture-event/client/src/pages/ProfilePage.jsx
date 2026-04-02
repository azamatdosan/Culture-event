import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import './ProfilePage.css';

const fileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

const ProfilePage = () => {
  // 🔴 ТЕПЕРЬ МЫ БЕРЕМ setUser СЮДА 🔴
  const { user, logout, setUser } = useAuth(); 
  
  const [activeTab, setActiveTab] = useState('settings');
  const [successMsg, setSuccessMsg] = useState('');
  
  const [editFirstName, setEditFirstName] = useState(user?.firstName || '');
  const [editLastName, setEditLastName] = useState(user?.lastName || '');
  const [avatarPreview, setAvatarPreview] = useState(user?.avatar || null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const [tickets, setTickets] = useState([]);
  const [ticketsLoading, setTicketsLoading] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [ticketToCancel, setTicketToCancel] = useState(null);

  const fetchTickets = async () => {
    const token = localStorage.getItem('token'); // 🔴 ИЩЕМ ПРАВИЛЬНО
    if (!token) return;

    setTicketsLoading(true);
    try {
      const res = await fetch('/api/events/my/tickets', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (res.ok) setTickets(data);
    } catch (err) {
      console.error(err);
    } finally {
      setTicketsLoading(false);
    }
  };

  useEffect(() => {
    if (activeTab === 'tickets') fetchTickets();
  }, [activeTab]);

  const handleConfirmCancel = async () => {
    const token = localStorage.getItem('token'); // 🔴 ИЩЕМ ПРАВИЛЬНО
    try {
      const res = await fetch(`/api/events/${ticketToCancel.event._id}/ticket`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        setTickets(tickets.filter(t => t.event._id !== ticketToCancel.event._id));
        setSuccessMsg('Бронь отменена');
        setTimeout(() => setSuccessMsg(''), 3000);
      }
    } catch (err) {
      alert('Ошибка при отмене');
    } finally {
      setShowCancelModal(false);
    }
  };

  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setAvatarPreview(URL.createObjectURL(file)); 
    }
  };

  // 🔴 АБСОЛЮТНО ИДЕАЛЬНОЕ СОХРАНЕНИЕ 🔴
  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem('token'); // 🔴 ИЩЕМ ПРАВИЛЬНО
      if (!token) throw new Error("Токен не найден. Перезайдите в аккаунт.");

      let base64Image = avatarPreview; 
      if (selectedFile) base64Image = await fileToBase64(selectedFile);

      const response = await fetch('/api/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          firstName: editFirstName,
          lastName: editLastName,
          avatar: base64Image
        })
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Ошибка обновления');

      // Шапка сайта и настройки обновятся на лету, токен не потеряется!
      setUser(data); 

      setSuccessMsg('Профиль успешно обновлен!');
      setTimeout(() => setSuccessMsg(''), 3000);

    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (!user) return <div className="loading-state"><div className="spinner"></div></div>;

  return (
    <div className="profile-page">
      {successMsg && <div className="custom-toast success">✓ {successMsg}</div>}
      <div className="profile-cover"></div>
      
      <div className="container profile-container">
        <div className="profile-header-card">
          <div className="profile-avatar-wrapper">
            {avatarPreview ? (
              <img src={avatarPreview} alt="Avatar" className="profile-avatar-img" />
            ) : (
              <div className="profile-avatar-text">{editFirstName?.charAt(0).toUpperCase()}</div>
            )}
          </div>
          <div className="profile-info">
            <h1 className="profile-name">{editFirstName} {editLastName}</h1>
            <p className="profile-email">{user?.email}</p>
            {user?.role === 'admin' && <span className="admin-badge">Администратор</span>}
          </div>
          <button onClick={logout} className="logout-btn-profile">Выйти из аккаунта</button>
        </div>

        <div className="profile-tabs">
          <button className={`profile-tab ${activeTab === 'settings' ? 'active' : ''}`} onClick={() => setActiveTab('settings')}>
            ⚙️ Настройки профиля
          </button>
          <button className={`profile-tab ${activeTab === 'tickets' ? 'active' : ''}`} onClick={() => setActiveTab('tickets')}>
            🎟️ Мои билеты
          </button>
        </div>

        <div className="profile-content">
          {activeTab === 'settings' && (
            <div className="settings-section">
              <h2 className="settings-title">Личные данные</h2>
              <form className="settings-form" onSubmit={handleSave}>
                <div className="settings-avatar-group">
                  <div className="settings-avatar-preview">
                    {avatarPreview ? <img src={avatarPreview} alt="Preview" /> : <span>{editFirstName?.charAt(0).toUpperCase()}</span>}
                  </div>
                  <div className="settings-avatar-actions">
                    <p className="settings-avatar-hint">Загрузите новое фото профиля (JPG, PNG)</p>
                    <input type="file" accept="image/*" ref={fileInputRef} onChange={handleImageChange} style={{ display: 'none' }} />
                    <button type="button" className="upload-avatar-btn" onClick={() => fileInputRef.current.click()}>Выбрать фото</button>
                  </div>
                </div>
                <div className="form-group">
                  <label>Имя *</label>
                  <input type="text" value={editFirstName} onChange={(e) => setEditFirstName(e.target.value)} required />
                </div>
                <div className="form-group">
                  <label>Фамилия *</label>
                  <input type="text" value={editLastName} onChange={(e) => setEditLastName(e.target.value)} required />
                </div>
                <button type="submit" className="save-btn" disabled={loading}>{loading ? 'Сохранение...' : 'Сохранить изменения'}</button>
              </form>
            </div>
          )}

          {activeTab === 'tickets' && (
            <div className="tickets-tab-content">
              {ticketsLoading ? (
                <div className="spinner-centered"><div className="spinner"></div></div>
              ) : tickets.length === 0 ? (
                <div className="empty-profile-state">
                  <div className="empty-icon">🎫</div>
                  <h3>У вас пока нет билетов</h3>
                </div>
              ) : (
                <div className="tickets-list">
                  {tickets.map(t => (
                    <div key={t._id} className="user-ticket-item">
                      <Link to={`/events/${t.event._id}`} className="ticket-link-wrapper">
                        <img src={t.event.imageUrl} alt="" />
                        <div className="ticket-details">
                          <h4>{t.event.title}</h4>
                          <p>📅 {new Date(t.event.date).toLocaleDateString('ru-RU')}</p>
                        </div>
                      </Link>
                      <div className="ticket-action-box">
                        <button 
                          className="cancel-btn-small" 
                          onClick={(e) => {
                            e.preventDefault();
                            setTicketToCancel(t);
                            setShowCancelModal(true);
                          }}
                        >
                          Отменить
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {showCancelModal && (
        <div className="custom-modal-overlay">
          <div className="custom-modal confirm-delete-modal">
            <div className="warning-icon">🎟️</div>
            <h2>Отменить бронь?</h2>
            <p>Вы уверены, что хотите отменить билет на <strong>{ticketToCancel?.event.title}</strong>?</p>
            <div className="confirm-actions">
              <button className="cancel-btn" onClick={() => setShowCancelModal(false)}>НАЗАД</button>
              <button className="confirm-delete-btn" onClick={handleConfirmCancel}>ДА, ОТМЕНИТЬ</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;