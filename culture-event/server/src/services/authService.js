import User from '../models/User.js';
import bcrypt from 'bcrypt';

/**
 * Сервис для инкапсуляции сложной бизнес-логики авторизации.
 * Этот слой может быть использован контроллерами для выполнения специфичных задач,
 * не перегружая сами контроллеры деталями реализации.
 */
export const authService = {
  // Проверка, существует ли пользователь (используется при регистрации)
  checkUserExists: async (email) => {
    return await User.findOne({ email });
  },

  // Безопасная проверка пароля (сравнение хешей)
  verifyPassword: async (inputPassword, storedHash) => {
    return await bcrypt.compare(inputPassword, storedHash);
  },

  // Изолированная логика смены пароля (например, для функции "Восстановить пароль")
  changePassword: async (userId, newPassword) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    
    return await User.findByIdAndUpdate(
      userId, 
      { password: hashedPassword }, 
      { new: true }
    ).select('-password'); // Возвращаем пользователя без пароля
  },

  // Логика блокировки пользователя (если потребуется в админке)
  banUser: async (userId) => {
    // Пример расширения функционала
    return await User.findByIdAndUpdate(userId, { role: 'banned' }, { new: true });
  }
};