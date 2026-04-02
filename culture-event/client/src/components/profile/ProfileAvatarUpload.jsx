import React, { useState } from 'react';
import './ProfileAvatarUpload.css';

const ProfileAvatarUpload = ({ currentAvatar, onUpload }) => {
  const [preview, setPreview] = useState(currentAvatar || '/images/default-avatar.png');

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Создаем временную ссылку для предпросмотра
      const imageUrl = URL.createObjectURL(file);
      setPreview(imageUrl);
      
      // Передаем файл наверх для реальной загрузки на сервер
      if (onUpload) {
        onUpload(file);
      }
    }
  };

  return (
    <div className="avatar-upload-container">
      <div className="avatar-preview">
        <img src={preview} alt="Аватар пользователя" />
      </div>
      <label className="avatar-upload-label">
        Изменить фото
        <input 
          type="file" 
          accept="image/*" 
          onChange={handleImageChange} 
          className="avatar-hidden-input"
        />
      </label>
    </div>
  );
};

export default ProfileAvatarUpload;