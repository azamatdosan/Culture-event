import React from 'react';
import './EmptyState.css';
import Button from './Button';

const EmptyState = ({ 
  icon = '📭', 
  title = 'Здесь пока пусто', 
  description = 'Нет данных для отображения.', 
  actionText, 
  onAction 
}) => {
  return (
    <div className="empty-state-container">
      <div className="empty-state-icon">{icon}</div>
      <h3 className="empty-state-title">{title}</h3>
      <p className="empty-state-description">{description}</p>
      
      {/* Если передали текст и функцию, показываем кнопку (например, "Перейти к мероприятиям") */}
      {actionText && onAction && (
        <div className="empty-state-action">
          <Button variant="primary" onClick={onAction}>
            {actionText}
          </Button>
        </div>
      )}
    </div>
  );
};

export default EmptyState;