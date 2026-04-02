import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { validateEmail, validatePassword } from '../utils/validators';
import './LoginPage.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    const emailError = validateEmail(email);
    if (emailError) return setError(emailError);

    const passwordError = validatePassword(password);
    if (passwordError) return setError(passwordError);

    setLoading(true);
    try {
      await login(email, password);
      // ИЗМЕНЕНИЕ: Перекидываем на Главную
      navigate('/');
    } catch (err) {
      setError(err.message || 'Ошибка при входе');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page-wrapper">
      <div className="auth-card login-card">
        <h1 className="auth-title">С возвращением!</h1>
        <p className="auth-subtitle">Войдите, чтобы не пропустить лучшие события</p>

        {error && <div className="auth-error-message">{error}</div>}

        <form className="auth-form" onSubmit={handleSubmit}>
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

          <button type="submit" className="auth-submit-btn" disabled={loading}>
            {loading ? 'Вход...' : 'Войти'}
          </button>
        </form>

        <p className="auth-switch-text">
          Нет аккаунта? <Link to="/register">Зарегистрироваться</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;