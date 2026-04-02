/**
 * Класс для удобной генерации API ошибок с HTTP-статусами
 */
class ApiError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
    
    // Сохраняем стек вызовов для удобной отладки (где именно произошла ошибка)
    Error.captureStackTrace(this, this.constructor);
  }

  // Статические методы-помощники для самых частых ошибок
  static badRequest(message) {
    return new ApiError(400, message); // Ошибка в данных от клиента
  }

  static unauthorized(message) {
    return new ApiError(401, message); // Необходима авторизация (нет токена)
  }

  static forbidden(message) {
    return new ApiError(403, message); // Нет прав (например, не админ)
  }

  static notFound(message) {
    return new ApiError(404, message); // Ресурс не найден
  }

  static internal(message) {
    return new ApiError(500, message); // Ошибка на стороне сервера
  }
}

export default ApiError;