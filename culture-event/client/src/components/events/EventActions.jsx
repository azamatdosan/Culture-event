import React from 'react';
import './EventActions.css';
import FavoriteButton from './FavoriteButton';

function EventActions({
  isAdmin = false,
  isAuthenticated = false,
  isFavorite = false,
  onToggleFavorite,
  onShare,
  onEdit,
  onDelete,
}) {
  const handleShare = () => {
    if (onShare) {
      onShare();
      return;
    }

    if (navigator.share) {
      navigator.share({
        title: 'Culture Event',
        text: 'Посмотри это мероприятие на сайте Culture Event',
        url: window.location.href,
      });
      return;
    }

    navigator.clipboard.writeText(window.location.href);
    alert('Ссылка скопирована в буфер обмена');
  };

  return (
    <section className="event-actions">
      <div className="event-actions__left">
        {isAuthenticated ? (
          <FavoriteButton
            initialFavorite={isFavorite}
            onToggle={onToggleFavorite}
          />
        ) : (
          <button
            type="button"
            className="event-actions__secondary-button"
            disabled
            title="Войдите, чтобы добавить в избранное"
          >
            Войдите, чтобы добавить в избранное
          </button>
        )}

        <button
          type="button"
          className="event-actions__secondary-button"
          onClick={handleShare}
        >
          Поделиться
        </button>
      </div>

      {isAdmin && (
        <div className="event-actions__right">
          <button
            type="button"
            className="event-actions__admin-button event-actions__admin-button--edit"
            onClick={onEdit}
          >
            Редактировать
          </button>

          <button
            type="button"
            className="event-actions__admin-button event-actions__admin-button--delete"
            onClick={onDelete}
          >
            Удалить
          </button>
        </div>
      )}
    </section>
  );
}

export default EventActions;