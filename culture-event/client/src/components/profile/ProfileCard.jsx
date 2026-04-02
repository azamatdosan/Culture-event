import React from 'react';
import './ProfileCard.css';

const ProfileCard = ({ name, email, role, joinedDate }) => {
  return (
    <div className="profile-card">
      <div className="profile-info">
        <h2 className="profile-name">{name || 'Имя пользователя'}</h2>
        <p className="profile-email">{email || 'user@example.com'}</p>
        <div className="profile-meta">
          <span className="profile-role">
            Роль: <strong>{role === 'admin' ? 'Администратор' : 'Пользователь'}</strong>
          </span>
          <span className="profile-joined">На сайте с: {joinedDate}</span>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;