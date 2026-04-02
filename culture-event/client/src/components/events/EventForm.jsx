import React, { useState } from 'react';
import './EventForm.css';

const initialState = {
  title: '',
  date: '',
  time: '',
  location: '',
  category: '',
  price: '',
  description: '',
  image: null,
};

function EventForm({ onSubmit }) {
  const [form, setForm] = useState(initialState);
  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setForm({ ...form, image: file });
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (onSubmit) {
      onSubmit(form);
    }

    alert('Мероприятие создано!');
    setForm(initialState);
    setPreview(null);
  };

  return (
    <form className="event-form" onSubmit={handleSubmit}>
      <h2 className="event-form__title">Создать мероприятие</h2>

      <div className="event-form__grid">
        <input
          className="event-form__input"
          name="title"
          placeholder="Название"
          value={form.title}
          onChange={handleChange}
          required
        />

        <input
          className="event-form__input"
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          required
        />

        <input
          className="event-form__input"
          type="time"
          name="time"
          value={form.time}
          onChange={handleChange}
          required
        />

        <input
          className="event-form__input"
          name="location"
          placeholder="Место"
          value={form.location}
          onChange={handleChange}
          required
        />

        <select
          className="event-form__input"
          name="category"
          value={form.category}
          onChange={handleChange}
          required
        >
          <option value="">Категория</option>
          <option>Концерт</option>
          <option>Выставка</option>
          <option>Театр</option>
          <option>Лекция</option>
        </select>

        <input
          className="event-form__input"
          name="price"
          placeholder="Цена (например: Бесплатно)"
          value={form.price}
          onChange={handleChange}
        />
      </div>

      <textarea
        className="event-form__textarea"
        name="description"
        placeholder="Описание мероприятия"
        value={form.description}
        onChange={handleChange}
        required
      />

      <div className="event-form__image">
        <label className="event-form__upload">
          Загрузить изображение
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </label>

        {preview && (
          <img src={preview} alt="preview" className="event-form__preview" />
        )}
      </div>

      <button className="event-form__button" type="submit">
        Создать
      </button>
    </form>
  );
}

export default EventForm;