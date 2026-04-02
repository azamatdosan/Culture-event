import jwt from 'jsonwebtoken';
import { config } from '../config/env.js';

/**
 * Генерирует JWT токен для пользователя
 * @param {string} id - ID пользователя из базы данных MongoDB
 * @returns {string} - Подписанный JWT токен
 */
const generateToken = (id) => {
  // sign принимает три аргумента: данные (payload), секретный ключ и опции
  return jwt.sign({ id }, config.jwtSecret, {
    expiresIn: '30d', // Токен будет действителен 30 дней
  });
};

export default generateToken;