/**
 * Создает middleware для проверки обязательных полей
 * @param {Array} requiredFields - массив строк с названиями обязательных полей
 */
export const validateBody = (requiredFields) => {
  return (req, res, next) => {
    const missingFields = requiredFields.filter(field => !req.body[field]);

    if (missingFields.length > 0) {
      return res.status(400).json({
        message: `Пожалуйста, заполните следующие обязательные поля: ${missingFields.join(', ')}`
      });
    }

    next();
  };
};