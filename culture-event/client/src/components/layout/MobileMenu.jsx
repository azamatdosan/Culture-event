import React from 'react';
import './MobileMenu.css';

function MobileMenu({
  isOpen = false,
  isAuthenticated = false,
  isAdmin = false,
  onClose,
  onLogout,
}) {
  if (!isOpen) {
    return null;
  }

  const handleOverlayClick = (event) => {
    if (event.target.classList.contains('mobile-menu')) {
      onClose && onClose();
    }
  };

  return (
    <div className="mobile-menu" onClick={handleOverlayClick}>
      <div className="mobile-menu__panel">
        <div className="mobile-menu__top">
          <div className="mobile-menu__logo">Culture Event</div>

          <button
            type="button"
            className="mobile-menu__close"
            onClick={onClose}
            aria-label="Закрыть меню"
          >
            ×
          </button>
        </div>

        <nav className="mobile-menu__nav">
          <a href="/" onClick={onClose}>Главная</a>
          <a href="/events" onClick={onClose}>Афиша</a>
          <a href="/news" onClick={onClose}>Новости</a>
          <a href="/about" onClick={onClose}>О проекте</a>
          <a href="/contacts" onClick={onClose}>Контакты</a>
        </nav>

        <div className="mobile-menu__actions">
          {!isAuthenticated ? (
            <a
              href="/login"
              className="mobile-menu__button"
              onClick={onClose}
            >
              Войти
            </a>
          ) : (
            <>
              {isAdmin && (
                <a
                  href="/create-event"
                  className="mobile-menu__button mobile-menu__button--admin"
                  onClick={onClose}
                >
                  Создать мероприятие
                </a>
              )}

              <a
                href="/profile"
                className="mobile-menu__button"
                onClick={onClose}
              >
                Профиль
              </a>

              <button
                type="button"
                className="mobile-menu__button mobile-menu__button--logout"
                onClick={onLogout}
              >
                Выйти
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default MobileMenu;