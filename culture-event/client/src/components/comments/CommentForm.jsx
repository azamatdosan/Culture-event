import React, { useState } from 'react';
import './CommentForm.css';

const initialFormData = {
  userName: '',
  text: '',
};

function CommentForm({ onAddComment }) {
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');

  const validateForm = () => {
    const newErrors = {};

    if (!formData.userName.trim()) {
      newErrors.userName = 'Введите ваше имя';
    } else if (formData.userName.trim().length < 2) {
      newErrors.userName = 'Имя должно содержать минимум 2 символа';
    }

    if (!formData.text.trim()) {
      newErrors.text = 'Введите комментарий';
    } else if (formData.text.trim().length < 5) {
      newErrors.text = 'Комментарий должен содержать минимум 5 символов';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prevState) => ({
        ...prevState,
        [name]: '',
      }));
    }

    if (statusMessage) {
      setStatusMessage('');
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      setIsSubmitting(true);

      const newComment = {
        id: Date.now(),
        userName: formData.userName.trim(),
        text: formData.text.trim(),
        date: new Date().toLocaleDateString('ru-RU', {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        }),
        avatar: '',
      };

      if (onAddComment) {
        onAddComment(newComment);
      }

      await new Promise((resolve) => setTimeout(resolve, 500));

      setFormData(initialFormData);
      setErrors({});
      setStatusMessage('Комментарий успешно добавлен.');
    } catch (error) {
      setStatusMessage('Не удалось добавить комментарий. Попробуйте ещё раз.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="comment-form">
      <div className="comment-form__header">
        <h3 className="comment-form__title">Оставить комментарий</h3>
        <p className="comment-form__description">
          Поделитесь впечатлением о мероприятии или оставьте своё мнение.
        </p>
      </div>

      {statusMessage && (
        <div className="comment-form__status">
          {statusMessage}
        </div>
      )}

      <form className="comment-form__form" onSubmit={handleSubmit} noValidate>
        <div className="comment-form__group">
          <label className="comment-form__label" htmlFor="userName">
            Ваше имя
          </label>
          <input
            className={`comment-form__input ${errors.userName ? 'comment-form__input--error' : ''}`}
            id="userName"
            name="userName"
            type="text"
            placeholder="Введите имя"
            value={formData.userName}
            onChange={handleChange}
          />
          {errors.userName && (
            <p className="comment-form__error">{errors.userName}</p>
          )}
        </div>

        <div className="comment-form__group">
          <label className="comment-form__label" htmlFor="text">
            Комментарий
          </label>
          <textarea
            className={`comment-form__textarea ${errors.text ? 'comment-form__input--error' : ''}`}
            id="text"
            name="text"
            placeholder="Напишите комментарий"
            value={formData.text}
            onChange={handleChange}
            rows="5"
          />
          {errors.text && (
            <p className="comment-form__error">{errors.text}</p>
          )}
        </div>

        <button
          className="comment-form__button"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Отправка...' : 'Добавить комментарий'}
        </button>
      </form>
    </section>
  );
}

export default CommentForm;