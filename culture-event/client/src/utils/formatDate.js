/**
 * Форматирует дату в читаемый русский формат
 * Пример: "15 октября 2023, 14:30"
 */
export const formatDate = (dateString, includeTime = false) => {
  if (!dateString) return '';

  try {
    const date = new Date(dateString);
    
    // Настройки форматирования
    const options = {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      ...(includeTime && { hour: '2-digit', minute: '2-digit' })
    };

    return new Intl.DateTimeFormat('ru-RU', options).format(date);
  } catch (error) {
    console.error('Ошибка форматирования даты:', error);
    return dateString; // В случае ошибки возвращаем как есть
  }
};