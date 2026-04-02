import React, { useState } from 'react';
import './CommentSection.css';

import CommentForm from '../comments/CommentForm';
import CommentList from '../comments/CommentList';

function CommentSection() {
  const [comments, setComments] = useState([
    {
      id: 1,
      userName: 'Азамат',
      text: 'Очень крутое мероприятие!',
      date: '30 марта 2026',
      avatar: '',
    },
  ]);

  const handleAddComment = (newComment) => {
    setComments((prev) => [newComment, ...prev]);
  };

  return (
    <section className="comment-section">
      <div className="comment-section__container">
        <div className="comment-section__form">
          <CommentForm onAddComment={handleAddComment} />
        </div>

        <div className="comment-section__list">
          <CommentList comments={comments} />
        </div>
      </div>
    </section>
  );
}

export default CommentSection;