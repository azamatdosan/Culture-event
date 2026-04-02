import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Добавили useNavigate
import { useAuth } from '../hooks/useAuth';
import './NewsPage.css';

const NewsDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // Инициализируем навигацию
  const { user } = useAuth(); 
  
  const [article, setArticle] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);
  const [commenting, setCommenting] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 1. Загружаем новость
        const newsRes = await fetch(`/api/news/${id}`);
        if (newsRes.ok) {
          const newsData = await newsRes.json();
          setArticle(newsData);
        } else {
          console.error('Новость не найдена');
        }

        // 2. Пробуем загрузить комментарии
        try {
          const commentsRes = await fetch(`/api/comments/${id}`);
          if (commentsRes.ok) {
            setComments(await commentsRes.json());
          }
        } catch (commentErr) {
          console.log('Комментарии пока недоступны');
        }

      } catch (err) {
        console.error('Ошибка загрузки данных:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  // ФУНКЦИЯ УДАЛЕНИЯ НОВОСТИ
  const handleDeleteNews = async () => {
    if (!window.confirm('Вы уверены, что хотите навсегда удалить эту новость?')) return;

    const token = localStorage.getItem('token') || user?.token;
    try {
      const res = await fetch(`/api/news/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (res.ok) {
        alert('Новость успешно удалена');
        navigate('/news'); // Возвращаемся к списку новостей
      } else {
        const errorData = await res.json();
        alert(errorData.message || 'Ошибка при удалении');
      }
    } catch (err) {
      console.error(err);
      alert('Ошибка соединения с сервером');
    }
  };

  const handlePostComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const token = localStorage.getItem('token') || user?.token;
    if (!token) {
      alert('Пожалуйста, войдите в аккаунт, чтобы оставить комментарий.');
      return;
    }

    setCommenting(true);
    try {
      const res = await fetch('/api/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ newsId: id, text: newComment }) 
      });

      const data = await res.json();
      if (res.ok) {
        setComments([data, ...comments]);
        setNewComment(''); 
      } else {
        alert(data.message || 'Ошибка при отправке');
      }
    } catch (err) {
      console.error(err);
      alert('Ошибка соединения с сервером');
    } finally {
      setCommenting(false);
    }
  };

  if (loading) return <div className="loading-state"><div className="spinner"></div></div>;
  if (!article) return <div className="news-error"><h2>Новость не найдена</h2></div>;

  const articleText = article.content || article.text || article.description || '';
  const articleDate = article.createdAt || article.date;

  return (
    <div className="news-details-page">
      {/* ШАПКА НОВОСТИ */}
      <div 
        className="news-hero" 
        style={{ 
          background: article.imageUrl 
            ? `url(${article.imageUrl}) center/cover no-repeat` 
            : 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)' 
        }}
      >
        <div className="news-hero-overlay">
          <div className="news-hero-content">
            <span className="news-hero-date">
              {articleDate ? new Date(articleDate).toLocaleDateString('ru-RU') : 'Дата неизвестна'}
            </span>
            <h1 className="news-hero-title">{article.title || 'Без названия'}</h1>
            
            {/* КНОПКА УДАЛЕНИЯ ДЛЯ АДМИНА */}
            {user?.role === 'admin' && (
              <button onClick={handleDeleteNews} className="delete-news-btn">
                🗑️ Удалить новость
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ГЛАВНАЯ КАРТОЧКА С КОНТЕНТОМ */}
      <div className="news-content-card">
        <div className="news-full-text">
          {articleText ? (
            articleText.split('\n').map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))
          ) : (
            <p className="no-text">Текст новости отсутствует.</p>
          )}
        </div>

        {/* СЕКЦИЯ КОММЕНТАРИЕВ */}
        <div className="comments-section">
          <h3 className="comments-title">Комментарии ({comments ? comments.length : 0})</h3>

          {user ? (
            <form className="comment-form" onSubmit={handlePostComment}>
              <div className="comment-input-wrapper">
                <div className="comment-avatar-mini">
                  {user.firstName ? user.firstName.charAt(0).toUpperCase() : 'U'}
                </div>
                <textarea 
                  placeholder="Поделитесь своим мнением..." 
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  rows="3"
                  required
                />
              </div>
              <button type="submit" className="post-comment-btn" disabled={commenting}>
                {commenting ? 'Отправка...' : 'Отправить'}
              </button>
            </form>
          ) : (
            <div className="login-to-comment">
              <p>Пожалуйста, войдите в аккаунт, чтобы оставить комментарий.</p>
            </div>
          )}

          <div className="comments-list">
            {!comments || comments.length === 0 ? (
              <p className="no-comments">Пока нет комментариев. Будьте первым!</p>
            ) : (
              comments.map((comment) => (
                <div key={comment._id} className="comment-bubble">
                  <div className="comment-avatar">
                    {comment.user?.avatar ? (
                      <img src={comment.user.avatar} alt="avatar" />
                    ) : (
                      <span>{comment.user?.firstName ? comment.user.firstName.charAt(0).toUpperCase() : 'U'}</span>
                    )}
                  </div>
                  <div className="comment-body">
                    <div className="comment-header">
                      <span className="comment-author">
                        {comment.user?.firstName || 'Неизвестный'} {comment.user?.lastName || ''}
                      </span>
                      <span className="comment-date">
                        {comment.createdAt ? new Date(comment.createdAt).toLocaleString('ru-RU', { hour: '2-digit', minute:'2-digit', day: 'numeric', month: 'short' }) : ''}
                      </span>
                    </div>
                    <p className="comment-text">{comment.text}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsDetailsPage;