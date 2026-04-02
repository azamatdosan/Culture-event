// client/src/utils/validators.js

/**
 * Проверяет email на корректность и отсутствие русских букв
 * Возвращает текст ошибки или null, если всё отлично
 */
export const validateEmail = (email) => {
  if (!email) return 'Введите E-mail';
  
  // Проверка на русские буквы
  const cyrillicPattern = /[А-Яа-яЁё]/;
  if (cyrillicPattern.test(email)) {
    return 'E-mail не может содержать русские буквы';
  }

  // Строгая проверка формата (только английские буквы, цифры и спецсимволы почты)
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailPattern.test(email)) {
    return 'Неверный формат E-mail (пример: user@mail.com)';
  }

  return null; // Ошибок нет
};

/**
 * Проверяет пароль на надежность и отсутствие русских букв
 */
export const validatePassword = (password) => {
  if (!password) return 'Введите пароль';

  const cyrillicPattern = /[А-Яа-яЁё]/;
  if (cyrillicPattern.test(password)) {
    return 'Пароль должен состоять только из английских букв, цифр и символов';
  }

  if (password.length < 6) {
    return 'Пароль должен содержать минимум 6 символов';
  }

  return null; // Ошибок нет
};