import React, { useState } from 'react';
import './FavoriteButton.css';

function FavoriteButton({
  initialFavorite = false,
  onToggle,
  size = 'default',
  showText = true,
}) {
  const [isFavorite, setIsFavorite] = useState(initialFavorite);

  const handleToggleFavorite = () => {
    const nextValue = !isFavorite;
    setIsFavorite(nextValue);

    if (onToggle) {
      onToggle(nextValue);
    }
  };

  return (
    <button
      type="button"
      className={`favorite-button favorite-button--${size} ${
        isFavorite ? 'favorite-button--active' : ''
      }`}
      onClick={handleToggleFavorite}
      aria-label={isFavorite ? 'Убрать из избранного' : 'Добавить в избранное'}
      title={isFavorite ? 'Убрать из избранного' : 'Добавить в избранное'}
    >
      <svg
        className="favorite-button__icon"
        viewBox="0 0 24 24"
        fill={isFavorite ? 'currentColor' : 'none'}
        aria-hidden="true"
      >
        <path
          d="M12 20.5s-6.5-4.35-9.05-8.09C1.2 9.84 2.02 6.5 5.2 5.3c2.03-.77 4.2-.09 5.55 1.52L12 8.1l1.25-1.28c1.35-1.61 3.52-2.29 5.55-1.52 3.18 1.2 4 4.54 2.25 7.11C18.5 16.15 12 20.5 12 20.5Z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      {showText && (
        <span className="favorite-button__text">
          {isFavorite ? 'В избранном' : 'В избранное'}
        </span>
      )}
    </button>
  );
}

export default FavoriteButton;