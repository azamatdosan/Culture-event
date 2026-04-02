import React from 'react';
import { NavLink } from 'react-router-dom';
import './ProfileMenu.css';

const ProfileMenu = ({ onLogout }) => {
  return (
    <nav className="profile-menu">
      <ul className="profile-menu-list">
        <li>
          <NavLink to="/profile" end className={({ isActive }) => isActive ? "active" : ""}>
            Мои данные
          </NavLink>
        </li>
        <li>
          <NavLink to="/profile/favorites" className={({ isActive }) => isActive ? "active" : ""}>
            Избранные мероприятия
          </NavLink>
        </li>
        <li>
          <NavLink to="/profile/edit" className={({ isActive }) => isActive ? "active" : ""}>
            Редактировать профиль
          </NavLink>
        </li>
        <li>
          <button onClick={onLogout} className="profile-logout-btn">
            Выйти из аккаунта
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default ProfileMenu;