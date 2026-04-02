import React from 'react';
import { useNavigate } from 'react-router-dom';
import EmptyState from '../components/ui/EmptyState';
import './NotFoundPage.css';

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="not-found-page">
      <EmptyState
        icon="🧭"
        title="Ошибка 404: Страница не найдена"
        description="Кажется, вы перешли по неверной ссылке или страница была удалена. Давайте вернемся к началу."
        actionText="Вернуться на главную"
        onAction={() => navigate('/')}
      />
    </div>
  );
};

export default NotFoundPage;