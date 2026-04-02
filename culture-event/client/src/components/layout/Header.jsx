import React, { useState, useEffect, useRef } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import logo from '../../assets/images/logo.png';
import './Header.css';

const Header = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    navigate('/');
    setIsMenuOpen(false);
    setTimeout(() => { logout(); }, 50);
  };

  const defaultAvatar = 'https://cdn-icons-png.flaticon.com/512/149/149071.png';

  return (
    <header className="main-header">
      <div className="header-container">
        
        <Link to="/" className="logo-area">
          <img src={logo} alt="Culture Event" className="logo-image" />
          <span className="logo-text">Culture Event</span>
        </Link>

        {/* ЦЕНТРАЛЬНОЕ МЕНЮ (ПК) */}
        <nav className="center-nav">
          <NavLink to="/" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Главная</NavLink>
          <NavLink to="/events" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Мероприятия</NavLink>
          <NavLink to="/news" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Новости</NavLink>
          
          {isAuthenticated && user?.role === 'admin' && (
            <NavLink to="/admin/create-event" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Создать</NavLink>
          )}
        </nav>

        <div className="right-actions" ref={menuRef}>
          {isAuthenticated ? (
            <div className="auth-user-section">
              <Link to="/profile" className="avatar-link" title="Перейти в профиль">
                <img src={user?.avatar || defaultAvatar} alt="Профиль" className="user-avatar" />
              </Link>
              <button className="auth-btn logout-btn" onClick={handleLogout}>Выйти</button>
            </div>
          ) : (
            <div className="guest-section">
              <Link to="/login" className="guest-btn login-btn">Войти</Link>
              <Link to="/register" className="guest-btn register-btn">Регистрация</Link>
            </div>
          )}

          <div className="burger-menu-wrapper">
            <button className="burger-btn" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <span className="burger-icon">☰</span>
            </button>

            {isMenuOpen && (
              <div className="dropdown-menu">
                {/* МОБИЛЬНЫЕ ССЫЛКИ */}
                <Link to="/" className="mobile-nav-link" onClick={() => setIsMenuOpen(false)}>Главная</Link>
                <Link to="/events" className="mobile-nav-link" onClick={() => setIsMenuOpen(false)}>Мероприятия</Link>
                <Link to="/news" className="mobile-nav-link" onClick={() => setIsMenuOpen(false)}>Новости</Link>
                {isAuthenticated && user?.role === 'admin' && (
                  <Link to="/admin/create-event" className="mobile-nav-link" onClick={() => setIsMenuOpen(false)}>Создать</Link>
                )}
                
                <hr className="mobile-divider" />

                <Link to="/faq" onClick={() => setIsMenuOpen(false)}>FAQ</Link>
                
                {isAuthenticated && (
                  <Link to="/profile/favorites" onClick={() => setIsMenuOpen(false)}>Избранное</Link>
                )}
                <Link to="/contacts" onClick={() => setIsMenuOpen(false)}>Контакты</Link>
              </div>
            )}
          </div>
        </div>

      </div>
    </header>
  );
};

export default Header;