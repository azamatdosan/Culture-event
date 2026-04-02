import { config } from '../config/env.js';

// Обработчик для несуществующих маршрутов (404)
export const notFound = (req, res, next) => {
  const error = new Error(`Маршрут не найден - ${req.originalUrl}`);
  res.status(404);
  next(error); // Передаем ошибку в глобальный обработчик ниже
};

// Глобальный перехватчик ошибок (вызывается, если в контроллере произошел сбой)
export const errorHandler = (err, req, res, next) => {
  // Если статус код всё еще 200, меняем его на 500 (внутренняя ошибка сервера)
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

  res.status(statusCode).json({
    message: err.message,
    // Выводим стек (где именно произошла ошибка) только в режиме разработки
    stack: config.nodeEnv === 'production' ? null : err.stack,
  });
};