import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { validateEmail, validatePassword } from '../utils/validators';
import './RegisterPage.css';

const RegisterPage = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); 
    
    if (!firstName.trim() || !lastName.trim()) {
      return setError('Пожалуйста, заполните имя и фамилию');
    }

    const emailError = validateEmail(email);
    if (emailError) return setError(emailError);

    const passwordError = validatePassword(password);
    if (passwordError) return setError(passwordError);

    if (password !== confirmPassword) {
      return setError('Пароли не совпадают');
    }

    setLoading(true);
    try {
      await register({ firstName, lastName, email, password });
      // ИЗМЕНЕНИЕ: Перекидываем на Главную
      navigate('/');
    } catch (err) {
      setError(err.message || 'Ошибка при регистрации. Возможно, email уже занят.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page-wrapper">
      <div className="auth-card">
        <h1 className="auth-title">Присоединяйтесь!</h1>
        <p className="auth-subtitle">Создайте аккаунт для покупки билетов</p>

        {error && <div className="auth-error-message">{error}</div>}

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label>Имя</label>
              <input 
                type="text" 
                placeholder="Азамат" 
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Фамилия</label>
              <input 
                type="text" 
                placeholder="Досан" 
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
          </div>

          <div className="form-group">
            <label>E-mail</label>
            <input 
              type="text" 
              placeholder="example@mail.com" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Пароль</label>
            <input 
              type="password" 
              placeholder="••••••••" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Повторите пароль</label>
            <input 
              type="password" 
              placeholder="••••••••" 
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <button type="submit" className="auth-submit-btn" disabled={loading}>
            {loading ? 'Создание...' : 'Создать аккаунт'}
          </button>
        </form>

        <p className="auth-switch-text">
          Уже есть аккаунт? <Link to="/login">Войти</Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;