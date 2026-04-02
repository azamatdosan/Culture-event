import React from 'react';
import './ErrorMessage.css';
import Button from './Button'; // Переиспользуем нашу кнопку

const ErrorMessage = ({ message, onRetry }) => {
  return (
    <div className="error-message-container">
      <div className="error-icon">⚠️</div>
      <h3 className="error-title">Упс, что-то пошло не так</h3>
      <p className="error-text">
        {message || 'Произошла неизвестная ошибка при загрузке данных.'}
      </p>
      {onRetry && (
        <div className="error-action">
          <Button variant="danger" onClick={onRetry}>
            Попробовать снова
          </Button>
        </div>
      )}
    </div>
  );
};

export default ErrorMessage;