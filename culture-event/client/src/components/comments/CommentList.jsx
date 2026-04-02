import React from 'react';
import './CommentList.css';
import CommentItem from './CommentItem';

const demoComments = [
  {
    id: 1,
    userName: 'Азамат',
    text: 'Очень понравилась афиша, всё выглядит удобно и понятно. Хотелось бы больше вечерних мероприятий.',
    date: '30 марта 2026',
    avatar: '',
  },
  {
    id: 2,
    userName: 'Диана',
    text: 'Хороший сайт, быстро нашла нужное событие и добавила его в избранное.',
    date: '29 марта 2026',
    avatar: '',
  },
  {
    id: 3,
    userName: 'Мирас',
    text: 'Было бы круто добавить фильтр по районам города. В остальном всё супер.',
    date: '28 марта 2026',
    avatar: '',
  },
];

function CommentList({ comments = demoComments, title = 'Комментарии' }) {
  return (
    <section className="comment-list">
      <div className="comment-list__header">
        <h3 className="comment-list__title">{title}</h3>
        <span className="comment-list__count">{comments.length}</span>
      </div>

      {comments.length > 0 ? (
        <div className="comment-list__items">
          {comments.map((comment) => (
            <CommentItem key={comment.id} comment={comment} />
          ))}
        </div>
      ) : (
        <div className="comment-list__empty">
          Пока нет комментариев. Будьте первым, кто оставит отзыв.
        </div>
      )}
    </section>
  );
}

export default CommentList;