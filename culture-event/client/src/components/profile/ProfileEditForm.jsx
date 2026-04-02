import React, { useState } from 'react';
import './ProfileEditForm.css';

const ProfileEditForm = ({ initialData, onSave }) => {
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    email: initialData?.email || '',
    phone: initialData?.phone || '',
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setError(''); // Очищаем ошибку при вводе
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Базовая валидация на клиенте
    if (!formData.name.trim() || !formData.email.trim()) {
      setError('Имя и Email обязательны для заполнения');
      return;
    }

    if (onSave) {
      onSave(formData);
    }
  };

  return (
    <form className="profile-edit-form" onSubmit={handleSubmit}>
      <h3 className="form-title">Редактировать личные данные</h3>
      
      {error && <div className="form-error">{error}</div>}

      <div className="form-group">
        <label htmlFor="name">Имя</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Введите ваше имя"
        />
      </div>

      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Введите email"
        />
      </div>

      <div className="form-group">
        <label htmlFor="phone">Телефон (необязательно)</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="+7 (___) ___-__-__"
        />
      </div>

      <button type="submit" className="save-btn">Сохранить изменения</button>
    </form>
  );
};

export default ProfileEditForm;