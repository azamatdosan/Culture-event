import React, { useState } from 'react';
import './ContactForm.css';

function ContactForm() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Сообщение отправлено!');
    setForm({ name: '', email: '', message: '' });
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <h2 className="contact-form__title">Напишите нам</h2>

      <input
        className="contact-form__input"
        type="text"
        name="name"
        placeholder="Ваше имя"
        value={form.name}
        onChange={handleChange}
        required
      />

      <input
        className="contact-form__input"
        type="email"
        name="email"
        placeholder="Ваш email"
        value={form.email}
        onChange={handleChange}
        required
      />

      <textarea
        className="contact-form__textarea"
        name="message"
        placeholder="Ваше сообщение"
        value={form.message}
        onChange={handleChange}
        required
      />

      <button className="contact-form__button" type="submit">
        Отправить
      </button>
    </form>
  );
}

export default ContactForm;