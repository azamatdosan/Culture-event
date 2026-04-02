import React from 'react';
import './CommentItem.css';

function CommentItem({ comment }) {
  const { userName, text, date, avatar } = comment;

  return (
    <div className="comment-item">
      <div className="comment-item__avatar">
        {avatar ? (
          <img src={avatar} alt={userName} />
        ) : (
          <span>{userName.charAt(0).toUpperCase()}</span>
        )}
      </div>

      <div className="comment-item__content">
        <div className="comment-item__header">
          <span className="comment-item__name">{userName}</span>
          <span className="comment-item__date">{date}</span>
        </div>

        <p className="comment-item__text">{text}</p>
      </div>
    </div>
  );
}

export default CommentItem;